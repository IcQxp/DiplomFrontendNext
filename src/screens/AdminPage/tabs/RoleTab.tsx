import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useRoles } from "../../../hooks/admin/useRoles";

const RoleTab = () => {
  const { data, isLoading, loadData, updateData, deleteData } = useRoles();

  return (
    <DataTabContainer
      title="Роли"
      columns={["roleId", "name"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateData}
      onDelete={deleteData}
    />
  );
};

export default RoleTab;