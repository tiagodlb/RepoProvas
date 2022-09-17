/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Terms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Terms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Terms" ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Terms_number_key" ON "Terms"("number");
