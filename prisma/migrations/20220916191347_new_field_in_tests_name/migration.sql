/*
  Warnings:

  - Added the required column `name` to the `Tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tests" ADD COLUMN     "name" TEXT NOT NULL;
