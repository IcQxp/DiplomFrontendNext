import { useState, useEffect } from "react";
import { getAllRoles } from "@/api";
import { Role } from "@/types";

export const useRoles = () => {
  const [data, setData] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    if (data.length > 0) return;
    setIsLoading(true);
    try {
      const response = await getAllRoles();
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки ролей:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (id: number, updatedItem: Partial<Role>) => {
    setData((prev) =>
      prev.map((item) => (item.roleId === id ? { ...item, ...updatedItem } : item)
    ));
  };

  const deleteData = (id: number) => {
    setData((prev) => prev.filter((item) => item.roleId !== id));
  };

  return { data, isLoading, loadData, updateData, deleteData };
};