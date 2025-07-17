import { Criterion, Discipline, Document, DocumentType, Employee, Grade, Group, Lesson, Role, Student } from "@/types";
import { getAllCritea, getAllDisciplines, getAllDocuments, getAlldocumentTypes, getAllEmployees, getAllGrades, getAllGroups, getAllLessons, getAllRoles, getAllStudents } from "@/api";
import DataTab from "./tabs/DataTab";
import { ComponentProps } from "@/types/admin";

export type TabConfig<T extends object> = {
  index: number;
  label: string;
  // component: React.FC<ComponentProps<T>>;
  component: React.FC<any>;
  props: {
    title: string;
    fetchFn: (token?: string) => Promise<any>;
    idKey: keyof T;
    columns: Array<keyof T>;
  };
};

export type configEntity = TabConfig<Criterion>
  | TabConfig<Discipline>
  | TabConfig<Student>
  | TabConfig<Document>
  | TabConfig<DocumentType>
  | TabConfig<Employee>
  | TabConfig<Grade>
  | TabConfig<Group>
  | TabConfig<Lesson>
  | TabConfig<Role>;

export const tabConfigs: Array<configEntity> = [
  {
    index: 0,
    label: "Критерии",
    component: DataTab<Criterion>,
    props: {
      title: "Критерии",
      fetchFn: getAllCritea,
      idKey: 'criteriaId',
      columns: ['name', 'description', 'maxScore']
    }
  } as TabConfig<Criterion>,
  {
    index: 1,
    label: "Дисциплины",
    component: DataTab<Discipline>,
    props: {
      title: "Дисциплины",
      fetchFn: getAllDisciplines,
      idKey: 'disciplineId',
      columns: ['disciplineId', 'name']
    }
  } as TabConfig<Discipline>,
  {
    index: 2,
    label: "Студенты",
    component: DataTab<Student>,
    props: {
      title: "Студенты",
      fetchFn: getAllStudents,
      idKey: 'studentId',
      columns: ['studentId', 'lastname', 'firstname', 'patronymic', 'groupId']
    }
  } as TabConfig<Student>,
  {
    index: 3,
    label: "Документы",
    component: DataTab<Document>,
    props: {
      title: "Документы",
      fetchFn: (token?: string) => getAllDocuments(token),
      idKey: 'documentId',
      columns: ['documentId', 'downloadDate', 'studentId', 'statusId', 'filePath']
    }
  } as TabConfig<Document>,
  {
    index: 4,
    label: "Типы документов",
    component: DataTab<DocumentType>,
    props: {
      title: "Типы документов",
      fetchFn: getAlldocumentTypes,
      idKey: 'documentTypeId',
      columns: ['documentTypeId', 'name', 'description']
    }
  } as TabConfig<DocumentType>,
  {
    index: 5,
    label: "Работники",
    component: DataTab<Employee>,
    props: {
      title: "Работники",
      fetchFn: getAllEmployees,
      idKey: 'employeeId',
      columns: ["employeeId", "lastname", "firstname", "patronymic", "birthDate", "login", "email", "telephone", "roleId"]
    }
  } as TabConfig<Employee>,
  {
    index: 6,
    label: "Оценки",
    component: DataTab<Grade>,
    props: {
      title: "Оценки",
      fetchFn: getAllGrades,
      idKey: 'gradeId',
      columns: ['gradeId', 'lessonId', 'studentId', 'value']
    }
  } as TabConfig<Grade>,
  {
    index: 7,
    label: "Группы",
    component: DataTab<Group>,
    props: {
      title: "Группы",
      fetchFn: getAllGroups,
      idKey: 'groupId',
      columns: ['groupId', 'groupNumber']
    }
  } as TabConfig<Group>,
  {
    index: 8,
    label: "Занятия",
    component: DataTab<Lesson>,
    props: {
      title: "Занятия",
      fetchFn: getAllLessons,
      idKey: 'lessonId',
      columns: ['disciplineId', 'employeeId', 'groupId', 'lessonDate', 'lessonTimeId']
    }
  } as TabConfig<Lesson>,
  {
    index: 9,
    label: "Роли",
    component: DataTab<Role>,
    props: {
      title: "Роли",
      fetchFn: getAllRoles,
      idKey: 'roleId',
      columns: ['roleId', 'name']
    }
  } as TabConfig<Role>
];
