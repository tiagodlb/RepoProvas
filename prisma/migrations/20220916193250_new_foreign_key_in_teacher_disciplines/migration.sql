-- AddForeignKey
ALTER TABLE "teacherDisciplines" ADD CONSTRAINT "teacherDisciplines_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
