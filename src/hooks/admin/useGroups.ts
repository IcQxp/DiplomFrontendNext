import { useState, useEffect } from "react";
import { getAllGroups } from "@/api";
import { Group } from "@/types";

export const useGroups = () => {
  const [data, setData] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    if (data.length > 0) return;
    setIsLoading(true);
    try {
      const response = await getAllGroups();
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки групп:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (id: number, updatedItem: Partial<Group>) => {
    setData((prev) =>
      prev.map((item) => (item.groupId === id ? { ...item, ...updatedItem } : item)
    ));
  };

  const deleteData = (id: number) => {
    setData((prev) => prev.filter((item) => item.groupId !== id));
  };

  return { data, isLoading, loadData, updateData, deleteData };
};