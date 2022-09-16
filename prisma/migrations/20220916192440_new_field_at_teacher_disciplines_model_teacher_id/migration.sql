/*
  Warnings:

  - Added the required column `teacherId` to the `TeacherDisciplines` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeacherDisciplines" ADD COLUMN     "teacherId" INTEGER NOT NULL;
