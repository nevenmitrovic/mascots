import { TableCell, TableHead, TableRow } from "@mui/material";

const TableHeader = ({ data }: { data: string[] }) => {
  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "var(--color-background)" }}>
        {data.map((item, i) => (
          <TableCell
            key={i}
            align="left"
            sx={{
              backgroundColor: "var(--color-background)",
              capitalize: "capitalize",
              color: "var(--color-text-dark)",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
