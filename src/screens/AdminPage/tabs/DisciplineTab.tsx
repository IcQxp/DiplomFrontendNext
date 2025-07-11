import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { Discipline } from "@/types";
import { getAllDisciplines } from "@/api";

const DisciplineTab = () => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useDataLoader<Discipline>(getAllDisciplines,'disciplineId');

  return (
    <DataTabContainer
      title="Дисциплины"
      columns={["disciplineId", "name"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default DisciplineTab;