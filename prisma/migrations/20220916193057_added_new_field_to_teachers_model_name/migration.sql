/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Teachers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Teachers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Teachers" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_name_key" ON "Teachers"("name");
