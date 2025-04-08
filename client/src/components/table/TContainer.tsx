import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableHeader from "./THeader";
import TableContent from "./TContent";
import React from "react";
import TablePaginationComponent from "./TPagination";
import { getObjectKeys } from "../../utils/helper/helperFunctions";

const TableContainerComponent = <T extends Record<string, unknown>>({
  data,
}: {
  data: T[];
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const headers = getObjectKeys(data[0]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHeader data={headers} />
          <TableContent page={page} rowsPerPage={10} />
        </Table>
      </TableContainer>
      <TablePaginationComponent
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableContainerComponent;
