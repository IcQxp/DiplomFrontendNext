import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { Grade } from "@/types";
import { getAllGrades } from "@/api";

const GradeTab = () => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useDataLoader<Grade>(getAllGrades,'gradeId');

  return (
    <DataTabContainer
      title="Оценки"
      columns={["gradeId", "lessonId", "studentId", "value"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default GradeTab;