/*
  Warnings:

  - Added the required column `days` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `classes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_classes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "batch" INTEGER NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "days" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "classes_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "classes_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_classes" ("batch", "courseId", "createdAt", "description", "endDate", "id", "price", "startDate", "teacherId", "updatedAt") SELECT "batch", "courseId", "createdAt", "description", "endDate", "id", "price", "startDate", "teacherId", "updatedAt" FROM "classes";
DROP TABLE "classes";
ALTER TABLE "new_classes" RENAME TO "classes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
