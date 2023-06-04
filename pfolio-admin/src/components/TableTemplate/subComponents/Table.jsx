import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { setupColumns } from "./helpers/setupColumns";

export const Table = ({
  data,
  setCurrentRowInfo,
  setRequestBody,
  setEditorMode,
  setEditorIsOpen,
  route,
  columnsTitles,
}) => {
  const columns = setupColumns(data, route, columnsTitles);
  return (
    <Box sx={{ height: "800px", width: "100%" }}>
      <DataGrid
        initialState={{
          sorting: { sortModel: [{ field: "id", sort: "desc" }] },
          pagination: {
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        disableColumnResize={false}
        sx={{ width: "100%", cursor: "pointer", zIndex: "0" }}
        columns={columns}
        rows={data}
        disableRowSelectionOnClick
        onRowClick={(rowInfo) => {
          setCurrentRowInfo(rowInfo.row);
          setRequestBody(rowInfo.row);
          setEditorMode("edit");
          setEditorIsOpen(true);
        }}
      />
    </Box>
  );
};
