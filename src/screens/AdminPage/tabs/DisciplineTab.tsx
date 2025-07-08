import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDisciplines } from "../../../hooks/admin/useDisciplines";

const DisciplineTab = () => {
  const { disciplines, isLoading, loadDisciplines, updateDiscipline, deleteDiscipline } = useDisciplines();

  return (
    <DataTabContainer
      title="Дисциплины"
      columns={["disciplineId", "name"]}
      data={disciplines}
      isLoading={isLoading}
      onLoad={loadDisciplines}
      onSearch={() => {}}
      onEdit={updateDiscipline}
      onDelete={deleteDiscipline}
    />
  );
};

export default DisciplineTab;