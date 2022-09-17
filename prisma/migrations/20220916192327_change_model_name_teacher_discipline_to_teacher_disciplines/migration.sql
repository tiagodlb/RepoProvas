/*
  Warnings:

  - You are about to drop the `TeacherDiscipline` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TeacherDiscipline";

-- CreateTable
CREATE TABLE "TeacherDisciplines" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "TeacherDisciplines_pkey" PRIMARY KEY ("id")
);
