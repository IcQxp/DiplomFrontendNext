import { useState, useEffect } from "react";
import { getAllEmployees } from "@/api";
import { Employee } from "@/types";

export const useEmployees = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    if (data.length > 0) return;
    setIsLoading(true);
    try {
      const response = await getAllEmployees();
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки работников:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (id: number, updatedItem: Partial<Employee>) => {
    setData((prev) =>
      prev.map((item) => (item.employeeId === id ? { ...item, ...updatedItem } : item)
    ));
  };

  const deleteData = (id: number) => {
    setData((prev) => prev.filter((item) => item.employeeId !== id));
  };

  return { data, isLoading, loadData, updateData, deleteData };
};