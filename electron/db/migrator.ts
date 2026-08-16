import fs from "node:fs";
import path from "node:path";
import { app } from "electron";
import { prisma } from "./prisma";
import { Prisma } from "../../generated/prisma/client";

function getMigrationsDir(): string | null {
  const candidatePaths = [
    path.join(process.resourcesPath, "prisma", "migrations"),
    path.join(process.cwd(), "prisma", "migrations"),
    path.join(app.getAppPath(), "..", "prisma", "migrations"),
    path.join(app.getAppPath(), "prisma", "migrations"),
  ];

  for (const candidate of candidatePaths) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

export const applyMigrations = async (): Promise<void> => {
  try {
    await prisma.$executeRaw(Prisma.sql`
      CREATE TABLE IF NOT EXISTS "_applied_migrations" (
        "id" TEXT PRIMARY KEY,
        "applied_at" DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const migrationsDir = getMigrationsDir();

    if (!migrationsDir) {
      console.warn("[Migrator] ⚠️ Could not find 'prisma/migrations' folder.");
      return;
    }

    const migrationFolders = fs
      .readdirSync(migrationsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)
      .sort();

    if (migrationFolders.length === 0) {
      return;
    }

    for (const folder of migrationFolders) {
      const existing = await prisma.$queryRaw<any[]>(
        Prisma.sql`SELECT id FROM _applied_migrations WHERE id = ${folder} LIMIT 1`,
      );

      if (!existing || existing.length === 0) {
        const sqlPath = path.join(migrationsDir, folder, "migration.sql");

        if (fs.existsSync(sqlPath)) {
          const sql = fs.readFileSync(sqlPath, "utf8");

          const statements = sql
            .split(";")
            .map((stmt) => stmt.trim())
            .filter((stmt) => stmt.length > 0);

          await prisma.$transaction(async (tx) => {
            for (const statement of statements) {
              await tx.$executeRawUnsafe(statement);
            }

            await tx.$executeRaw(
              Prisma.sql`INSERT INTO _applied_migrations (id) VALUES (${folder})`,
            );
          });

          console.log(`[Migrator] ✅ Applied migration: ${folder}`);
        }
      }
    }
  } catch (error) {
    throw error;
  }
};
