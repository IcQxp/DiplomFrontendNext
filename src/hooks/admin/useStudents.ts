// hooks/useStudents.ts
import { useState, useEffect } from "react";
import { getAllStudents } from "@/api";
import { Student } from "@/types";

export const useStudents = () => {
  const [data, setData] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await getAllStudents();
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки студентов:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (id: number, updatedItem: Partial<Student>) => {
    setData((prev) =>
      prev.map((item) => (item.studentId === id ? { ...item, ...updatedItem } : item)
    ));
  };

  const deleteData = (id: number) => {
    setData((prev) => prev.filter((item) => item.studentId !== id));
  };

  return { data, isLoading, loadData, updateData, deleteData };
};