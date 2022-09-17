-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "TeacherDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
