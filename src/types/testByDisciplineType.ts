export interface NameObject {
  name: string;
}

export interface ITest {
  name: string;
  categories: NameObject;
}

export interface ITestTeacher {
  tests: ITest[];
  teachers: NameObject;
}

export interface IDisciplineTeacher {
  name: string;
  teacherDisciplines: ITestTeacher[];
}

export type ITestIdentifier = { teacher: string } | { discipline: string };

export type IMappedTest = {
  name: string;
} & ITestIdentifier;

export interface ICategory {
  name: string;
  tests: IMappedTest[];
}
