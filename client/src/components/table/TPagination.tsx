import TablePagination from "@mui/material/TablePagination";
import { locations } from "./tableData";
type TablePaginationComponentProps = {
  rowsPerPage: number;
  page: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TablePaginationComponent = ({
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
}: TablePaginationComponentProps) => {
  return (
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component={"div"}
      count={locations.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default TablePaginationComponent;
