// CriterionTab.tsx
import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { Criterion } from "@/types";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { getAllCritea } from "@/api";

const CriterionTab = () => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useDataLoader<Criterion>(getAllCritea,'criteriaId');

  return (
    <DataTabContainer
      title="Критерии"
      columns={["criteriaId", "name"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={(query) => {}}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default CriterionTab;