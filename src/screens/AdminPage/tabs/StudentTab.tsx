// tabs/StudentTab.tsx
import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { Student } from "@/types";
import { getAllStudents } from "@/api";

const StudentTab = () => {
  const { data, isLoading, loadData, updateItem, deleteItem} = useDataLoader<Student>(getAllStudents,'studentId');

  return (
    <DataTabContainer
      title="Студенты"
      columns={["studentId", "lastname", "firstname", "patronymic", "group"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default StudentTab;