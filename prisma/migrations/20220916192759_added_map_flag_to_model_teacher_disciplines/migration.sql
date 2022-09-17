/*
  Warnings:

  - You are about to drop the `TeacherDisciplines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherDisciplineId_fkey";

-- DropTable
DROP TABLE "TeacherDisciplines";

-- CreateTable
CREATE TABLE "teacherDisciplines" (
    "id" SERIAL NOT NULL,
    "teacherId" INTEGER NOT NULL,
    "disciplineId" INTEGER NOT NULL,

    CONSTRAINT "teacherDisciplines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teacherDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
