import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useGroups } from "../../../hooks/admin/useGroups";

const GroupTab = () => {
  const { data, isLoading, loadData, updateData, deleteData } = useGroups();

  return (
    <DataTabContainer
      title="Группы"
      columns={["groupId", "groupNumber"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateData}
      onDelete={deleteData}
    />
  );
};

export default GroupTab;