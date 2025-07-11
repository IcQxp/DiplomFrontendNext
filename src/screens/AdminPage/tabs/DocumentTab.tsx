// tabs/DocumentTab.tsx
import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { Document } from "@/types";
import { getAllDocuments } from "@/api";
import { useDataLoader } from "@/hooks/admin/useDataLoader";

const DocumentTab = () => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useDataLoader<Document>((token?:string)=>getAllDocuments(token),'documentId');

  return (
    <DataTabContainer
      title="Документы"
      columns={["documentId", "studentId", "filePath", "score", "downloadDate"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default DocumentTab;