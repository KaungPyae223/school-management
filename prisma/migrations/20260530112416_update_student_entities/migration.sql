/*
  Warnings:

  - You are about to drop the column `nrc` on the `students` table. All the data in the column will be lost.
  - Made the column `address` on table `teachers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `teachers` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_students" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "dob" DATETIME,
    "gender" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_students" ("address", "createdAt", "dob", "email", "gender", "id", "image", "name", "phone", "updatedAt") SELECT "address", "createdAt", "dob", "email", "gender", "id", "image", "name", "phone", "updatedAt" FROM "students";
DROP TABLE "students";
ALTER TABLE "new_students" RENAME TO "students";
CREATE TABLE "new_teachers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "nrc" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_teachers" ("address", "createdAt", "email", "id", "image", "name", "nrc", "phone", "updatedAt") SELECT "address", "createdAt", "email", "id", "image", "name", "nrc", "phone", "updatedAt" FROM "teachers";
DROP TABLE "teachers";
ALTER TABLE "new_teachers" RENAME TO "teachers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
