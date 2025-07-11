// GenericDataTab.tsx
import React from "react";
import { DataTabContainer } from "../DataTabContainer";

interface GenericDataTabProps<T> {
  title: string;
  columns: (keyof T)[];
  useData: () => {
    data: T[];
    isLoading: boolean;
    loadData: () => void;
    updateItem: (id: number, data: Partial<T>) => void;
    deleteItem: (id: number) => Promise<void>;
  };
}

export const GenericDataTab = <T extends { id: number }>({
  title,
  columns,
  useData,
}: GenericDataTabProps<T>) => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useData();

  return (
    <DataTabContainer
      title={title}
      columns={columns}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};