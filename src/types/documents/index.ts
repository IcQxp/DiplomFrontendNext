import { Description, Id, Name } from "../shortTypes";

export interface DocumentStatusUpdateModel {
  StatusId: number; // ID нового статуса документа
  CriteriaId?: number | null; // ID критерия (может быть null)
  EmployeeId?: number | null; // ID сотрудника, выполняющего проверку (может быть null)
  DocumentTypeId?: number | null; // ID типа документа (может быть null)
  Score?: number | null; // Оценка документа (может быть null)
}

export interface Criterion {
    criteriaId: Id;
    name: Name;
    description: Description;
    maxScore: number;
    documents?: Document[]; // Если нужно
}
