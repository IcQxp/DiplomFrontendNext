import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useLessons } from "../../../hooks/admin/useLessons";

const LessonTab = () => {
  const { data, isLoading, loadData, updateData, deleteData } = useLessons();

  return (
    <DataTabContainer
      title="Занятия"
      columns={["lessonId","lessonDate"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => {}}
      onEdit={updateData}
      onDelete={deleteData}
    />
  );
};

export default LessonTab;