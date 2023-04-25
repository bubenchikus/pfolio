import React from 'react';
import { DataGrid} from '@mui/x-data-grid';
import Box from '@mui/material/Box';

export const TableTemplate = ({tableData}) => {

    const [selectedRows, setSelectedRows] = React.useState([]);

    if (!tableData){return (<></>)};

    const columnsTitles = Object.keys(tableData[0]);
    var columns = [];
    columnsTitles.forEach((el)=>{
        var flex = 1;
        if (["id", "redraw"].includes(el) ){flex=0.5};
        if (["about", "pictureUrl", "txt"].includes(el) ){flex=2.5};
        columns.push({field: el, flex: flex})}
        );

    return (
        <Box sx={{"height": "500px", "width": "100%"}}>
        <DataGrid
        sx={{"width": "100%"}}
        columns={columns}
        rows={tableData}
        checkboxSelection
        disableRowSelectionOnClick

        onRowSelectionModelChange={(ids) => {
            console.log(ids);
        }}
      />
      </Box>
    );
};
