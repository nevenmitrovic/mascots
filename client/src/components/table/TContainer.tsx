import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { useState } from "react";
import TableContent from "./TableContent";
import TableHeader from "./TableHeader";
import TPagination from "./TPagination";
import { TContainerProps } from "../../types/tableTypes";

const TContainer = <T extends { _id: string }>({
  data,
  headers,
  onEdit,
  onDelete,
}: TContainerProps<T>) => {
  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const numOfPages = Math.ceil(data.length / rowsPerPage);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const dataOnCurrentPage = data.slice(
    currentPage * rowsPerPage - rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHeader data={headers} />
          <TableContent
            data={dataOnCurrentPage}
            headers={headers}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Table>
        <TPagination
          currentPage={currentPage}
          numOfPages={numOfPages}
          handlePageChange={handlePageChange}
        />
      </TableContainer>
    </>
  );
};

export default TContainer;
