import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, TableBody, TableCell, TableRow } from "@mui/material";

type TableContentProps<T> = {
  data: T[];
  headers: { name: string; label: string }[];
  onEdit: (item: T) => void;
  onDelete: (_id: string) => void;
};

const TableContent = <T extends { _id: string }>({
  data,
  headers,
  onEdit,
  onDelete,
}: TableContentProps<T>) => {

  return (
    <TableBody>
      {data.map((item) => (
        <TableRow key={item._id}>
          {headers.map((header) => (
            <TableCell key={header.label as string}>
              {item[header.name as keyof T] as string}
            </TableCell>
          ))}
          <TableCell>
            <IconButton onClick={() => onEdit(item)}>
              <EditIcon color="primary" />
            </IconButton>
            <IconButton onClick={() => onDelete(item._id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableContent;
