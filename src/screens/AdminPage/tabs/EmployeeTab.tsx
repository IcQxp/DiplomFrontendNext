import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useEmployees } from "../../../hooks/admin/useEmployees";

const EmployeeTab = () => {
  const { data, isLoading, loadData, updateData, deleteData } = useEmployees();

  return (
    <DataTabContainer
      title="Работники"
      columns={["employeeId", "lastname", "firstname", "patronymic", "birthDate", "login", "email", "telephone", "roleId"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateData}
      onDelete={deleteData}
    />
  );
};

export default EmployeeTab;