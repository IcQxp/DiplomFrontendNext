import { BirthDate, DateString, Description, Email, EndTime, FilePath, GenderCode, GroupNumber, Id, LessonDate, Name, Password, RoleName, Score, StartTime, StatusName, Telephone } from "../shortTypes";

export interface Criterion {
  criteriaId: number;
  name: string;
  description: string;
  maxScore: number;
}

export interface Discipline {
    disciplineId: Id;
    name: Name;
    lessons?: Lesson[]; // Если нужно
}

export interface Document {
    documentId: Id;
    studentId: Id;
    statusId: Id;
    employeeId?: Id;
    filePath: FilePath;
    downloadDate: DateString; 
    documentTypeId?: Id;
    criteriaId?: Id;
    score?: Score;
    criteria?: Criterion;
    documentType?: DocumentType;
    employee?: Employee;
    status: Status;
}

export interface DocumentType {
    documentTypeId: Id;
    name: Name;
    description: Description;
    documents?: Document[]; 
}

export interface Employee {
    employeeId: Id;
    genderCode: GenderCode;
    lastname: Name;
    firstname: Name;
    patronymic: Name;
    birthDate: BirthDate; 
    login: Name;
    password: Password;
    email: Email;
    telephone: Telephone;
    roleId: Id;
    documents?: Document[]; 
    genderCodeNavigation?: Gender;
    lessons?: Lesson[]; 
    role?: Role;
}

export interface Gender {
    genderCode: GenderCode;
    name: Name;
    employees?: Employee[];
    students?: Student[];
}

export interface Grade {
    gradeId: Id;
    studentId: Id;
    lessonId: Id;
    value: number;
    lesson?: Lesson;
    student?: Student;
}

export interface Group {
    groupId: Id;
    groupNumber: GroupNumber;
    lessons?: Lesson[];
    students?: Student[];
}

export interface Lesson {
    lessonId: Id;
    disciplineId: Id;
    groupId: Id;
    lessonTimeId: Id;
    lessonDate: LessonDate;
    employeeId: Id;
    discipline?: Discipline;
    employee?: Employee;
    grades?: Grade[];
    group?: Group;
    lessonTime?: LessonTime;
}

export interface LessonTime {
    lessonTimeId: Id;
    startTime: StartTime; 
    endTime: EndTime; 
    lessons?: Lesson[];
}

export interface Role {
    roleId: Id;
    name: RoleName;
    employees?: Employee[];
}

export interface Status {
    statusId: Id;
    name: StatusName;
    documents?: Document[];
}

export interface Student {
    studentId: Id;
    lastname: Name;
    firstname: Name;
    patronymic: Name;
    genderCode: GenderCode;
    groupId: Id;
    login: Name;
    password: Password;
    birthDate: BirthDate; 
    genderCodeNavigation?: Gender;
    grades?: Grade[];
    group?: Group;
}