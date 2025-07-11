import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { Employee } from "@/types";
import { getAllEmployees } from "@/api";

const EmployeeTab = () => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useDataLoader<Employee>(getAllEmployees, 'employeeId');

  return (
    <DataTabContainer
      title="Работники"
      columns={["employeeId", "lastname", "firstname", "patronymic", "birthDate", "login", "email", "telephone", "roleId"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => { }}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default EmployeeTab;