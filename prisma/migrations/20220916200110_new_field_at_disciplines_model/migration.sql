/*
  Warnings:

  - Added the required column `termId` to the `Disciplines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Disciplines" ADD COLUMN     "termId" INTEGER NOT NULL;
