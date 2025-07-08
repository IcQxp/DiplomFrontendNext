import { useState, useEffect } from "react";
import { getAlldocumentTypes } from "@/api"; // Имя функции может отличаться!
import { DocumentType } from "@/types";

export const useDocumentTypes = () => {
  const [data, setData] = useState<DocumentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    if (data.length > 0) return;
    setIsLoading(true);
    try {
      const response = await getAlldocumentTypes();
      setData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки типов документов:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateData = (id: number, updatedItem: Partial<DocumentType>) => {
    setData((prev) =>
      prev.map((item) => (item.documentTypeId === id ? { ...item, ...updatedItem } : item)
    ));
  };

  const deleteData = (id: number) => {
    setData((prev) => prev.filter((item) => item.documentTypeId !== id));
  };

  return { data, isLoading, loadData, updateData, deleteData };
};