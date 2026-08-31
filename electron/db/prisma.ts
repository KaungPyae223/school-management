import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client";
import path from "node:path";
import fs from "node:fs";
import { app } from "electron";

const dbDir = app.getPath("userData");
const dbPath = path.join(dbDir, "app.db");

console.log(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const adapter = new PrismaBetterSqlite3({ url: dbPath });
const prisma = new PrismaClient({ adapter });

export { prisma };
