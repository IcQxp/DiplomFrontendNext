import { useState, useEffect } from "react";
import { getAllCritea } from "@/api";
import { Criterion } from "@/types";

export const useCriteria = () => {
  const [criteria, setCriteria] = useState<Criterion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCriteria = async () => {
    setIsLoading(true);
    try {
      const response = await getAllCritea();
      setCriteria(response.data);
    } catch (error) {
      console.error("Ошибка загрузки критериев:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCriterion = (id: number, updatedData: Partial<Criterion>) => {
    setCriteria((prev) =>
      prev.map((item) => (item.criteriaId === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteCriterion = (id: number) => {
    setCriteria((prev) => prev.filter((item) => item.criteriaId !== id));
  };

  return { criteria, isLoading, loadCriteria, updateCriterion, deleteCriterion };
};