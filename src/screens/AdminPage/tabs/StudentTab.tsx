// tabs/StudentTab.tsx
import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useStudents } from "../../../hooks/admin/useStudents";

const StudentTab = () => {
  const { data, isLoading, loadData, updateData, deleteData } = useStudents();

  return (
    <DataTabContainer
      title="Студенты"
      columns={["studentId", "lastname", "firstname", "patronymic", "group"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateData}
      onDelete={deleteData}
    />
  );
};

export default StudentTab;