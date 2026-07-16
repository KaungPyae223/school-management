/*
  Warnings:

  - A unique constraint covering the columns `[nrc]` on the table `teachers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teachers_nrc_key" ON "teachers"("nrc");
