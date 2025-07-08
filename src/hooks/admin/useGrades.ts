import { useState, useEffect } from "react";
import { getAllGrades } from "@/api";
import { Grade } from "@/types";

export const useGrades = () => {
  const [data, setData] = useState<Grade[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    if (data.length > 0) return;
    setIsLoading(true);
    try {
      const response = await getAllGrades();
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки оценок:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (id: number, updatedItem: Partial<Grade>) => {
    setData((prev) =>
      prev.map((item) => (item.gradeId === id ? { ...item, ...updatedItem } : item)
    ));
  };

  const deleteData = (id: number) => {
    setData((prev) => prev.filter((item) => item.gradeId !== id));
  };

  return { data, isLoading, loadData, updateData, deleteData };
};