import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDocumentTypes } from "../../../hooks/admin/useDocumentTypes";

const DocumentTypeTab = () => {
  const { data, isLoading, loadData, updateData, deleteData } = useDocumentTypes();

  return (
    <DataTabContainer
      title="Типы документов"
      columns={["documentTypeId", "name", "description"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateData}
      onDelete={deleteData}
    />
  );
};

export default DocumentTypeTab;