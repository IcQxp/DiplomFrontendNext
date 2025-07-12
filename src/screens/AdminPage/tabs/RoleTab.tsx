import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { Role } from "@/types";
import { getAllRoles } from "@/api";

const RoleTab = () => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useDataLoader<Role>(getAllRoles,'roleId');

  return (
    <DataTabContainer
      title="Роли"
      columns={["roleId", "name"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default RoleTab;