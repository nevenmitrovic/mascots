import { Box } from "@mui/material";
import {
  DataGrid,
  GridCellEditStopParams,
  GridCellEditStopReasons,
  GridCellParams,
  GridColDef,
  MuiEvent,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import EditAction from "./EditAction";
import { Location } from "./tableData";

type DataGridComponentProps = {
  rows: Location[];
  columns: GridColDef[];
  onRowUpdate: (updateRow: Location) => void;
};

function GridComponent({ rows, columns, onRowUpdate }: DataGridComponentProps) {
  const [rowId, setRowId] = useState("");

  const memoizedColumns = useMemo(() => {
    return columns.map((col) => {
      if (col.field === "action") {
        return {
          ...col,
          renderCell: (params: GridCellParams) => (
            <EditAction {...{ params, rowId, setRowId }} />
          ),
        };
      }
      return col;
    });
  }, [columns, rowId]);

  const handleCellEditStop = (
    params: GridCellEditStopParams,
    event: MuiEvent
  ) => {
    console.log("2", "im editing from inside of a grid");
    setRowId(params.id as string);
    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
      event.defaultMuiPrevented = true;
    }

    if (onRowUpdate && params.reason === GridCellEditStopReasons.enterKeyDown) {
      const updatedRow = params.row;
      console.log();
      if (updatedRow) {
        onRowUpdate(updatedRow);
      }
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        columns={memoizedColumns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 20]}
        getRowId={(row) => row.id}
        onCellEditStop={handleCellEditStop}
      />
    </Box>
  );
}

export default GridComponent;
