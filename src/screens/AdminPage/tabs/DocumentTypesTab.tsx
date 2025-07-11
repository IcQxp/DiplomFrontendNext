import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { DocumentType } from "@/types";
import { getAlldocumentTypes } from "@/api";

const DocumentTypeTab = () => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useDataLoader<DocumentType>(getAlldocumentTypes,'documentTypeId');
  // const { data, isLoading, loadData, updateData, deleteData } = useDocumentTypes();

  return (
    <DataTabContainer
      title="Типы документов"
      columns={["documentTypeId", "name", "description"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default DocumentTypeTab;