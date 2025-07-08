// CriterionTab.tsx
import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useCriteria } from "../../../hooks/admin/useCriteria";

const CriterionTab = () => {
  const { criteria, isLoading, loadCriteria, updateCriterion, deleteCriterion } = useCriteria();

  return (
    <DataTabContainer
      title="Критерии"
      columns={["criteriaId", "name"]}
      data={criteria}
      isLoading={isLoading}
      onLoad={loadCriteria}
      onSearch={(query) => {}}
      onEdit={updateCriterion}
      onDelete={deleteCriterion}
    />
  );
};

export default CriterionTab;