import { useState, useEffect } from "react";
import { getAllDisciplines } from "@/api";
import { Discipline } from "@/types";

export const useDisciplines = () => {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadDisciplines = async () => {
    setIsLoading(true);
    try {
      const response = await getAllDisciplines();
      setDisciplines(response.data);
    } catch (error) {
      console.error("Ошибка загрузки дисциплин:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateDiscipline = (id: number, updatedData: Partial<Discipline>) => {
    setDisciplines((prev) =>
      prev.map((item) => (item.disciplineId === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteDiscipline = (id: number) => {
    setDisciplines((prev) => prev.filter((item) => item.disciplineId !== id));
  };

  return { disciplines, isLoading, loadDisciplines, updateDiscipline, deleteDiscipline };
};