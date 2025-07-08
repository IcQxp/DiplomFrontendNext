import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useGrades } from "../../../hooks/admin/useGrades";

const GradeTab = () => {
  const { data, isLoading, loadData, updateData, deleteData } = useGrades();

  return (
    <DataTabContainer
      title="Оценки"
      columns={["gradeId", "lessonId", "studentId", "value"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateData}
      onDelete={deleteData}
    />
  );
};

export default GradeTab;