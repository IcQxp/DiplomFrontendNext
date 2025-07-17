import React, { useState, useEffect } from "react";
import { Paper, Typography, CircularProgress } from "@mui/material";
import SearchBar from "./SearchBar";
import DataTable from "./DataTable";

interface DataTabContainerProps<T> {
  title: string;
  columns: (keyof T)[];
  data: T[];
  isLoading: boolean;
  onSearch: (query: string) => void;
  onLoad: () => Promise<void>;
  onEdit: (id: number, updatedData: T) => void;
  onDelete: (id: number) => void;
}

export const DataTabContainer = <T extends { [key: string]: any }>({
  title,
  columns,
  data,
  isLoading,
  onSearch,
  onLoad,
  onEdit,
  onDelete,
}: DataTabContainerProps<T>) => {
  useEffect(() => {
    if (data.length === 0) onLoad();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <SearchBar onSearch={onSearch} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={data}
          columns={columns as (keyof T)[]}
          // columns={columns as string[]}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </Paper>
  );
};