import { TableBody, TableCell, TableRow } from "@mui/material";

const TableContent = ({
  page,
  rowsPerPage,
  data,
}: {
  page: number;
  rowsPerPage: number;
  data: Location[];
}) => {
  return (
    <TableBody>
      {data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.phone}</TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

export default TableContent;
