import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { Group } from "@/types";
import { getAllGroups } from "@/api";

const GroupTab = () => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useDataLoader<Group>(getAllGroups,'groupId');

  return (
    <DataTabContainer
      title="Группы"
      columns={["groupId", "groupNumber"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default GroupTab;