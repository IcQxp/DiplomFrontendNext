// hooks/useDocuments.ts
import { useState, useEffect } from "react";
import { getAllDocuments } from "@/api";
import { Document } from "@/types";

export const useDocuments = () => {
  const [data, setData] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');

  const loadData = async () => {
    if (data.length > 0) return;
    setIsLoading(true);
    try {
      if (token) {

        const response = await getAllDocuments(token);
        setData(response.data);
      }
    } catch (error) {
      console.error("Ошибка загрузки документов:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (id: number, updatedItem: Partial<Document>) => {
    setData((prev) =>
      prev.map((item) => (item.documentId === id ? { ...item, ...updatedItem } : item)
    ));
  };

  const deleteData = (id: number) => {
    setData((prev) => prev.filter((item) => item.documentId !== id));
  };

  return { data, isLoading, loadData, updateData, deleteData };
};