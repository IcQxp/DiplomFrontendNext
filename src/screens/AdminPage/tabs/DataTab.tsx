import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { ComponentProps } from "@/types/admin";

const DataTab = <T extends object>(
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