import { TableCell, TableHead, TableRow } from "@mui/material";

type HeaderProps = {
  data: { name: string; label: string }[];
};

const TableHeader = ({ data }: HeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        {data.map((item) => (
          <TableCell
            key={item.name}
            align="left"
            sx={{
              backgroundColor: "var(--color-background)",
              color: "var(--color-text-dark)",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.label}
          </TableCell>
        ))}
        <TableCell
          align="left"
          sx={{
            backgroundColor: "var(--color-background)",
            color: "var(--color-text-dark)",
            fontWeight: "bold",
          }}
        >
          Akcija
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
