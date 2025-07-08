import { useState, useEffect } from "react";
import { getAllLessons } from "@/api";
import { Lesson } from "@/types";

export const useLessons = () => {
  const [data, setData] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    if (data.length > 0) return;
    setIsLoading(true);
    try {
      const response = await getAllLessons();
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки занятий:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (id: number, updatedItem: Partial<Lesson>) => {
    setData((prev) =>
      prev.map((item) => (item.lessonId === id ? { ...item, ...updatedItem } : item)
    ));
  };

  const deleteData = (id: number) => {
    setData((prev) => prev.filter((item) => item.lessonId !== id));
  };

  return { data, isLoading, loadData, updateData, deleteData };
};