import { TableBody, TableCell, TableRow } from "@mui/material";
import { locations } from "./tableData";

const TableContent = ({
  page,
  rowsPerPage,
}: {
  page: number;
  rowsPerPage: number;
}) => {
  return (
    <TableBody>
      {locations
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((location) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={location.id}>
              <TableCell>{location.name}</TableCell>
              <TableCell>{location.adress}</TableCell>
              <TableCell>{location.location}</TableCell>
              <TableCell>{location.phone}</TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TableContent;
