import { Pagination, Stack } from "@mui/material";
import { TablePaginationComponentProps } from "types/tableTypes";

const TPagination = ({
  currentPage,
  numOfPages,
  handlePageChange,
}: TablePaginationComponentProps) => {
  return (
    <Stack sx={{ display: "flex", justifyContent: "flex-end" }} spacing={2}>
      <Pagination
        count={numOfPages}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        siblingCount={2}
        onChange={(e, newPage) => handlePageChange(e, newPage)}
      />
    </Stack>
  );
};

export default TPagination;
