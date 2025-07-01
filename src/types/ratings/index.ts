export interface RatingWithCriteria {
  count: number
  criteriaIDs: number[]
}

export interface RatingResponse {
  data: DataEntry[];
  keys: KeyEntry[];
}

// Один элемент из массива data
export interface DataEntry {
  criteria: string;
  [studentName: string]: string | number; // criteria + оценки студентов
}

// Общий объект: студент -> критерий -> оценка
export interface StudentCriteriaMap {
  [studentName: string]: {
    [criteria: string]: number;
  };
}

export type KeyEntry = { [id: string]: string };

export interface NivoDefaultData {
  data: DataEntry[];
  keys: string[];
}
