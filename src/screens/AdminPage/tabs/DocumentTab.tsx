// tabs/DocumentTab.tsx
import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDocuments } from "../../../hooks/admin/useDocuments";

const DocumentTab = () => {
  const { data, isLoading, loadData, updateData, deleteData } = useDocuments();

  return (
    <DataTabContainer
      title="Документы"
      columns={["documentId", "studentId", "filePath", "score", "downloadDate"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateData}
      onDelete={deleteData}
    />
  );
};

export default DocumentTab;