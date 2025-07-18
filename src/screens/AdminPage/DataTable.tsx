import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: (keyof T)[];
  onEdit: (id: number, updatedData: T) => void;
  onDelete: (id: number) => void;
};

const DataTable = <T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
}
  : DataTableProps<T>) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingRow, setEditingRow] = useState<T | null>(null);

  const handleEditClick = (row: T) => {
    setEditingRow(row);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editingRow) {
      onEdit(editingRow.id, editingRow);
    }
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column.toString()}</TableCell>
              ))}
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: T, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column]}</TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditClick(row)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => onDelete(row.id)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Модальное окно для редактирования */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Редактирование записи</DialogTitle>
        <DialogContent>
          {columns.map((column, index) => (
            <TextField
              key={index}
              label={column.toString()}
              fullWidth
              margin="dense"
              value={editingRow?.[column] || ""}
              onChange={(e) =>
                setEditingRow({ ...editingRow, [column]: e.target.value } as T)
              }
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Отмена</Button>
          <Button onClick={handleSaveEdit}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;