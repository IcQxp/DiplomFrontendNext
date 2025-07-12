import { AxiosResponse } from "axios";
import { useState } from "react";

type IdKey<T> = keyof T;

export const useDataLoader = <T extends Record<string, any>>(
  fetchFn: (token?: string) => Promise<AxiosResponse<T[]>>,
  idKey: IdKey<T> = 'id' as IdKey<T>,
  updateFn?: (id: number | string, data: Partial<Omit<T, typeof idKey>>) => Promise<void>,
  deleteFn?: (id: number | string) => Promise<void>
) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchFn();
      setData(result.data);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (id: number | string, updatedData: Partial<Omit<T, typeof idKey>>) => {
    setData((prev) =>
      prev.map((item) => (item[idKey] === id ? ({ ...item, ...updatedData } as T) : item))
    );
    if (updateFn) {
      await updateFn(id, updatedData);
    }
  };

  const deleteItem = async (id: number | string) => {
    setData((prev) => prev.filter((item) => item[idKey] !== id));
    if (deleteFn) {
      await deleteFn(id);
    }
  };

  return { data, isLoading, loadData, updateItem, deleteItem };
};