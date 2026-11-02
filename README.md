# School Management System

An offline-first desktop application for running a tuition school or training centre: students,
teachers, courses, classes, enrollments and payments — with dashboards, analytics, a timetable,
and encrypted backup. Built with Electron, React 19, TypeScript, Tailwind CSS and Prisma (SQLite).

No server, no internet connection, no per-user accounts. All data stays on the machine, in your
`userData` folder, protected by a local master password and optional two-factor authentication.

**Platforms:** Linux (AppImage, .deb) · Windows (NSIS installer) · macOS (DMG)
**Languages:** English · Myanmar (မြန်မာ) · Japanese (日本語)

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Database and Prisma workflow](#database-and-prisma-workflow)
- [Available scripts](#available-scripts)
- [Packaging and distribution](#packaging-and-distribution)
- [Security model](#security-model)
- [Backup and restore](#backup-and-restore)
- [Development notes](#development-notes)
- [Troubleshooting](#troubleshooting)
- [Repository and license](#repository-and-license)

---

## Features

### Setup and onboarding

- First-run **setup wizard**: welcome, preferences (appearance, theme, language, default view),
  master password, optional 2FA enrolment, and restoring from an existing encrypted backup.
- **Guided tours** (react-joyride) on the main pages, resettable from Settings.

### Core records

| Module         | Capabilities                                                                                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Students**   | Profile with photo, gender, date of birth; grid/table views; search, sort and pagination; enrolled-class history; CSV export                                                                                                                                        |
| **Teachers**   | Profile with contact details; assigned classes and timetable tabs; soft delete with restore; CSV export                                                                                                                                                             |
| **Courses**    | Description, default price, cover image; linked classes; soft delete with restore; CSV export                                                                                                                                                                       |
| **Classes**    | Course + teacher assignment, batch, start/end dates, daily time slot, weekly days, price; teacher double-booking detection on create/update; auto-derived status (`not_started`, `ongoing`, `complete`); manual completion; enrolled-student management; CSV export |
| **Enrollment** | Enroll a student into a class at a custom price; withdraw / reinstate an enrollment                                                                                                                                                                                 |
| **Payments**   | Record instalments against an enrollment with optional payment-proof image; "outstanding" and full lists with paid / remaining / last-paid sorting; per-enrollment payment history; deletion with confirm dialog                                                    |

### Scheduling

- **Timetable** built on FullCalendar, filterable by course or teacher, with localized month/week/day
  labels for English, Myanmar and Japanese.

### Insights

- **Dashboard** — KPI cards (students, teachers, classes, revenue), revenue vs. enrollment trend,
  course enrollment distribution, today's classes, recent enrollments, recent payments, and
  outstanding-payment list.
- **Analysis** — schedule utilization, gender and age-group demographics, enrollment vs. withdrawal
  retention, top courses, teacher revenue, and teacher workload (relative percentage).
- All charts (Recharts) have translated tooltips, axis labels and legends.

### Data management

- Per-module **CSV export** through the native save dialog.
- **Encrypted backup** export/import (password-protected ZIP via 7-Zip).
- **Reset all data** with password verification, clearing the database and stored images.

### Security

- Master password stored only as a bcrypt hash, itself encrypted with Electron `safeStorage`
  (OS keyring-backed).
- Login lockout after **5 failed attempts for 15 minutes**, plus a penalty lockout when the system
  clock is rolled backwards to dodge a lockout.
- Optional **TOTP two-factor authentication** with QR enrolment and single-use backup codes.
- Every mutating and reading IPC channel goes through `protectedHandle`, so the renderer cannot
  touch data while unauthenticated.
- Password recovery is only possible through 2FA: after verifying a TOTP code (or a backup code) you
  may set a new password up to 3 times (`reset_counts`). Without 2FA enabled, a lost password means
  the data can only be recovered from an encrypted backup.

### Experience

- Tailwind CSS 4 + shadcn/ui (Radix primitives), light/dark/system colour scheme.
- Grid or table views with a persisted default preference and selectable columns.
- Full i18n via i18next (`en-GB`, `my-MM`, `ja-JP`), including localized digits, currency and dates.
- Toast notifications (sonner), skeletons/spinners, empty states, error boundary and 404 pages.
- Custom frameless splash/loading window on startup and an app icon.

---

## Tech stack

| Layer             | Technology                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Desktop shell     | Electron 36, electron-builder, electron-store, @electron/rebuild                              |
| Renderer          | React 19, TypeScript, Vite 8 (with React Compiler), React Router 7 (hash router, lazy routes) |
| UI                | Tailwind CSS 4, shadcn/ui + Radix UI, Lucide icons, Motion, sonner                            |
| Data fetching     | TanStack Query over IPC, Zustand for UI/preferences, React Hook Form + Zod for forms          |
| Persistence       | Prisma 7 with the `better-sqlite3` adapter (SQLite), raw migration SQL                        |
| Charts & calendar | Recharts, FullCalendar                                                                        |
| Security          | bcryptjs, otplib (TOTP), qrcode, Electron `safeStorage`                                       |
| Files & export    | fs-extra, node-7z + 7zip-bin, csv-stringify                                                   |
| i18n              | i18next + react-i18next + browser language detector                                           |

---

## Architecture

The app is split into a trusted main process and an untrusted renderer. There is no HTTP layer:
the renderer calls typed IPC channels through a context bridge.

```
React renderer (src/)
    │  window.api / window.authAPI / window.backupAPI / window.electronStore ...
    ▼
preload.js  ── contextBridge ── ipcRenderer.invoke(channel, payload)
    ▼
IPC handlers (electron/**/*.ipc.ts)      ← auth gate via protectedHandle
    ▼
Repositories (electron/repository/*.ts)  ← queries, filters, aggregation
    ▼
Prisma Client (generated/prisma) + better-sqlite3
    ▼
SQLite file at <userData>/app.db
```

- **IPC handlers** stay thin: they shape the response (`{ data, meta }` or `{ error }`), convert
  stored images to displayable URLs, and delegate the work down. Query logic belongs in repositories.
- **Repositories** own Prisma queries, dynamic filters/sorting/pagination (`query-utils.ts`) and the
  aggregate reports behind the dashboard and analysis pages.
- **Services** (`electron/auth/services`) implement password, TOTP and session logic.
- **`src/services/*.ts`** are thin typed wrappers over the bridge, consumed by feature hooks.
- Each UI feature is self-contained under `src/features/<name>` with `pages/`, `components/`,
  `hooks/api`, `hooks/forms`, `schema/` (Zod) and `tour/`.

### Where the data lives

Everything is under Electron's `userData` directory — `~/.config/School Management System` on Linux
(`~/.config/school-management` when running from source), `%APPDATA%\School Management System` on
Windows, `~/Library/Application Support/School Management System` on macOS:

| Path          | Contents                                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `app.db`      | SQLite database created and migrated on startup                                                                             |
| `images/`     | Student, teacher, course and payment-proof images served through the custom `image://` protocol (restricted to this folder) |
| `config.json` | electron-store: password hash, 2FA secrets/backup codes, lockout counters, setup flag, UI preferences                       |

---

## Project structure

```
electron/            Main-process code
├─ auth/             Login, 2FA/TOTP, sessions, backup, protected IPC wrapper
├─ db/               Prisma client singleton + startup migration runner
├─ ipc/              One *.ipc.ts channel file per domain, registered in ipc/index.ts
├─ repository/       Prisma query layer
├─ utils/            Image save/show/delete, time formatting, status, query helpers
├─ main.ts           Windows, splash screen, image protocol, IPC registration
├─ preload.js        contextBridge API surface
└─ store.ts          electron-store schema and defaults
prisma/
├─ schema.prisma     Course, Teacher, Student, Class, Enrollment, Payment
└─ migrations/       Timestamped SQL, applied at runtime by electron/db/migrator.ts
src/
├─ components/       Shared UI (table, form, dialog, side-bar, card-utils, ui/)
├─ features/         Feature modules (dashboard, students, teachers, courses,
│                    classes, enroll, payments, timetable, analysis, settings,
│                    auth, setup, help)
├─ hooks/            Generic data/UI hooks
├─ routers/          Route definitions + auth/setup loader guards
├─ services/         Renderer wrappers around the IPC bridge
├─ stores/           Zustand stores (language, theme, view, tour, breadcrumbs)
├─ translate/        i18n config and en/ja/my dictionaries
├─ types/            Shared types and the electron.d.ts bridge declaration
└─ utils/            Formatting for currency, dates, times, errors
scripts/           Build helpers (copy Electron assets)
generated/prisma/  Generated Prisma client (gitignored)
```

---

## Getting started

### Prerequisites

- **Node.js 20+** (developed on Node 22) and npm
- A C++ toolchain for the native SQLite module: `python3`, `make`, `g++`
  (on Debian/Ubuntu: `sudo apt install build-essential python3`)
- Internet access during `npm install`, because Electron and its build tools are downloaded

### Install

```bash
git clone https://github.com/KaungPyae223/school-management.git
cd school-management
cp .env.example .env      # DATABASE_URL used by the Prisma CLI only
npm install               # postinstall rebuilds better-sqlite3 for Electron
```

### Run in development

```bash
npm run dev:electron
```

This starts Vite on `http://localhost:5173`, waits for it, then launches Electron pointed at the dev
server via `VITE_DEV_SERVER_URL`. On first launch the setup wizard appears — complete it (or pick
"restore from backup") to reach the dashboard.

`npm run dev` starts the renderer only. The UI renders, but every `window.*` bridge is undefined,
so data calls will fail; use it for styling work only.

### Type-check and build the bundles

```bash
npm run build             # tsc -b && vite build, then esbuild for the main process
npm run preview           # preview the built renderer in a browser
```

`build:electron` bundles `electron/main.ts` to `dist-electron/main.js` as ESM for Node 20, keeps
`electron` and `better-sqlite3` external, prepends a `createRequire` banner so CommonJS
dependencies still work, and then copies `preload.js`, `loading.html` and `assets/` next to the
bundle.

### Lint

```bash
npm run lint
```

---

## Database and Prisma workflow

The schema (see `prisma/schema.prisma`) models six entities:

```
Course ──┐
         ├── Class ──┐
Teacher ─┘           ├── Enrollment ── Payment
Student ─────────────┘
```

- `Course` and `Teacher` use a `deleted` flag for soft deletes (restorable).
- `Enrollment.withdrawn` marks a student who left a class without deleting the payment history.
- `Class.days` stores the weekly pattern as a delimited string; `startTime`/`endTime` hold the
  daily slot.
- Money fields are integers (`Int`), so currency formatting happens in the renderer.

Prisma client generation goes to `generated/prisma` (gitignored), so generate before the first
build:

```bash
npx prisma generate
```

Change the schema, then create SQL and regenerate:

```bash
npx prisma migrate dev --name <description>
```

Migrations are **not** run by the Prisma CLI at runtime. `electron/db/migrator.ts` reads
`prisma/migrations/*/migration.sql`, splits on `;`, applies each unapplied folder inside a
transaction and records it in an `_applied_migrations` table. Migration folders are shipped as
`extraResources` in packaged builds, so existing installs upgrade in place on next launch.

`DATABASE_URL` in `.env` points at `file:./dev.db` and is only used by Prisma CLI tooling — including
`prisma migrate dev`, which creates its shadow/scratch database there. The app itself always opens
`<userData>/app.db`, so a root-level `dev.db` is just an artefact of CLI work (gitignored, safe to
delete).

---

## Available scripts

| Script                              | What it does                                                       |
| ----------------------------------- | ------------------------------------------------------------------ |
| `npm run dev`                       | Vite dev server for the renderer only                              |
| `npm run dev:electron`              | Vite + Electron concurrently (main development command)            |
| `npm run build:renderer`            | `tsc -b` then `vite build` → `dist/`                               |
| `npm run build:electron`            | esbuild the main process + copy Electron assets → `dist-electron/` |
| `npm run build`                     | Both of the above                                                  |
| `npm run preview`                   | Serve the built renderer                                           |
| `npm run lint`                      | ESLint over the whole project                                      |
| `npm run electron` / `npm run dist` | Build, then `electron-builder` → `release/`                        |
| `npm run rebuild`                   | Rebuild `better-sqlite3` against the installed Electron ABI        |
| `postinstall`                       | Same rebuild, automatically after `npm install`                    |

---

## Packaging and distribution

```bash
npm run dist
```

electron-builder (appId `com.school.management`, product name "School Management System") packs
`dist/`, `dist-electron/` and `generated/` into an asar archive, unpacks the native SQLite modules,
and copies `prisma/migrations/**/*.sql` into `Resources`. Output goes to `release/`:

- Linux — AppImage and `.deb` (category `Education`)
- Windows — NSIS installer (`build/icon.ico`)
- macOS — DMG (`build/icon.icns`)

Cross-building Windows/macOS artefacts from Linux generally requires Wine and, for macOS, an actual
Apple toolchain — Linux AppImage/.deb are the native targets here.

On Ubuntu 24.04 and newer, prefer the **`.deb`**: it installs the AppArmor profile and setuid
sandbox helper. Running the AppImage directly can fail because of restricted unprivileged user
namespaces; as a workaround launch it with `--no-sandbox` or set `ELECTRON_DISABLE_SANDBOX=1`.
Both packaged and unpacked builds accept `--user-data-dir` for isolated testing.

---

## Security model

- **Password** — bcrypt (10 rounds); the hash is encrypted with `safeStorage` before being written
  to electron-store, so the config file never contains a usable hash in plain text.
- **Session** — an in-memory flag in the main process (`auth.session.ts`); it does not survive a
  restart, which is why the login screen appears on every launch.
- **`protectedHandle`** wraps every domain channel and returns `{ success: false, error:
"UNAUTHORIZED" }` when the session is not authenticated and a password exists.
- **Brute force** — 5 wrong attempts trigger a 15-minute lockout; moving the system clock backwards
  is detected and applies a penalty lockout instead of a free retry.
- **2FA** — TOTP secrets and backup codes are stored encrypted via `safeStorage`; a verified
  2FA session is additionally required before backup export/import. QR codes are generated locally
  with `qrcode`.
- **Renderer hardening** — `contextIsolation: true`, `nodeIntegration: false`, no generic
  `ipcRenderer` exposure, and the `image://` protocol resolves paths inside `userData/images`
  only (path traversal rejected).
- **Reset data** — password-verified wipe of all tables plus the images folder.

> This is a single-operator, device-bound protection scheme. It defends against casual access to the
> machine and keeps data portable through encrypted backups; it is not a substitute for disk
> encryption or a multi-user authentication system.

---

## Backup and restore

Export from **Settings → Backup** (or during setup): the app checkpoints the WAL, stages `app.db`
and `images/` in a temp folder, and writes an encrypted ZIP named `school_backup_<date_time>.zip`
using the bundled `7za` binary, through a native save dialog. Your master password is the archive
passphrase, so **losing it means losing the data**.

Import takes a ZIP produced by this app, decrypts it with the password you type, replaces `app.db`
and `images/`, and then relaunches the application. Importing from the setup screen is how a new
machine adopts an existing dataset. Backups are point-in-time snapshots: anything recorded after the
export is lost when you restore.

---

## Development notes

Conventions this codebase follows, worth matching when adding features:

1. **Keep queries in the repository layer.** Handler → repository → Prisma. New aggregation goes in
   `electron/repository/`. (A couple of handlers still do a single `findUnique` lookup — treat that
   as legacy, not the pattern to copy.)
2. Register a new channel in `electron/ipc/index.ts`, expose it in `electron/preload.js`, declare its
   signature in `src/types/electron.d.ts`, and wrap it in `src/services/<domain>.ts` before using it
   from a hook.
3. Use `protectedHandle` instead of `ipcMain.handle` for anything that reads or writes user data.
4. Raw SQL aggregates arrive over IPC as `BigInt`; convert with `Number(...)` before arithmetic
   (`Math.min`, division) to avoid runtime TypeErrors.
5. Forms use React Hook Form with a Zod schema in `src/features/<name>/schema/`; reuse the shared
   form parts in `src/components/form/` (`RequiredLabel`, `NumberInput`, `DateInput`, `TimeInput`,
   `ImageInput`, `FormHeader`, `FormError`, `FormFooter`).
6. All renderer-facing strings go through `t()`; add keys to `en.json`, `ja.json` and `my.json`
   together, including chart labels and tooltips.
7. Errors from handlers are returned as `{ error }` rather than thrown, and surfaced with
   `translate-error` + sonner toasts.
8. The React Compiler is enabled in `vite.config.ts`, so keep components free of side effects outside
   hooks and memoize where profiling asks for it.

---

## Troubleshooting

| Symptom                                                 | Likely cause / fix                                                                                                                                                                                                                       |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Native module `NODE_MODULE_VERSION` mismatch on startup | `better-sqlite3` was built for Node, not Electron. Run `npm run rebuild`.                                                                                                                                                                |
| Blank window pointing at `localhost:5173`               | Vite was not ready or was started separately. Use `npm run dev:electron`.                                                                                                                                                                |
| `Cannot find module '../../generated/prisma/client'`    | Client not generated. Run `npx prisma generate`.                                                                                                                                                                                         |
| `[Migrator] Could not find 'prisma/migrations' folder`  | Migrations missing from the package. Confirm the `extraResources` entry and reinstall the build.                                                                                                                                         |
| AppImage will not start on Ubuntu 24.04+                | AppArmor/nosuid sandbox restriction. Install the `.deb`, or run with `--no-sandbox` / `ELECTRON_DISABLE_SANDBOX=1`.                                                                                                                      |
| Locked out after failed logins                          | Expected: wait out the countdown, or restore a backup. Repeated password recovery is capped by `reset_counts`.                                                                                                                           |
| Forgot the master password                              | Use the **Forgot password** link on the login screen (only shown when 2FA is enabled) — it requires a valid TOTP or backup code and consumes one of the `reset_counts` attempts. With 2FA off and no backup, the data is not recoverable |
| Images do not appear                                    | They are served from `userData/images` through `image://`; moving the database without the folder breaks references.                                                                                                                     |

Logs are printed to the main process stdout (`npm run dev:electron` terminal) and the renderer dev
tools.

---

## Repository and license

- Source: <https://github.com/KaungPyae223/school-management>
- Author: Kaung Pyae Aung
- License: MIT (see [LICENSE](LICENSE))
