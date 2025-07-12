import React from "react";
import { DataTabContainer } from "../DataTabContainer";
import { useDataLoader } from "@/hooks/admin/useDataLoader";
import { Lesson } from "@/types";
import { getAllLessons } from "@/api";

const LessonTab = () => {
  const { data, isLoading, loadData, updateItem, deleteItem } = useDataLoader<Lesson>(getAllLessons, 'lessonId');

  return (
    <DataTabContainer
      title="Занятия"
      columns={["lessonId", "lessonDate"]}
      data={data}
      isLoading={isLoading}
      onLoad={loadData}
      onSearch={() => { }}
      onEdit={updateItem}
      onDelete={deleteItem}
    />
  );
};

export default LessonTab;