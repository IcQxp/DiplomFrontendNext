// CriterionTab.tsx
import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { AxiosResponse } from "axios";
import { ComponentProps } from "@/types/admin";



const DataTab = <T extends object>(
  // title: string,
  // fetchFn: (token?: string) => Promise<AxiosResponse<T[]>>,
  // idKey: IdKey<T> = 'id' as IdKey<T>,
  // columns: Array<PrimitiveKeys<T>>,
  // updateFn?: (id: number | string, data: Partial<Omit<T, typeof idKey>>) => Promise<void>,
  // deleteFn?: (id: number | string) => Promise<void>
  { 
  title,
  fetchFn,
  idKey,
  columns,
  updateFn,
  deleteFn
}: ComponentProps<T>
) => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useDataLoader<T>(fetchFn, idKey, updateFn, deleteFn);

  return (
    <DataTabContainer
      title={title}
      columns={columns}
      // columns={["criteriaId", "name"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={(query) => { }}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default DataTab;