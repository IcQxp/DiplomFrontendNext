import { ReactNode } from "react";
import { Criterion, Discipline, Student, Document, DocumentType, Employee, Grade, Group, Lesson, Role } from "@/types";
import CriterionTab from "./tabs/CriterionTab";

export type TabConfig<T> = {
  label: string;
  columns: (keyof T)[];
  Component: ReactNode;
};

export const tabConfigs = [
  {
    label: "Критерии",
    columns: ["criteriaId", "name"],
    Component: <CriterionTab />,
  },
  // {
  //   label: "Дисциплины",
  //   columns: ["disciplineId", "name"],
  //   Component: <DisciplineTab />,
  // },
  // {
  //   label: "Студенты",
  //   columns: ["studentId", "lastname", "firstname", "patronymic", "group"],
  //   Component: <StudentTab />,
  // },
  // Добавьте остальные вкладки аналогично...
];