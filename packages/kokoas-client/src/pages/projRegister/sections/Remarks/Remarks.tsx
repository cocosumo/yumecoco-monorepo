import { Grid } from '@mui/material';
import { PageSubTitle } from 'kokoas-client/src/components';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef<{
  id: string,
  noteCreateTime: Date;
  noteUpdateTime: Date;
  remark: string
}>[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'noteCreateTime',
    headerName: '作成日時',
    width: 150,
    type: 'date',
    editable: false,
  },
  {
    field: 'noteUpdateTime',
    headerName: '更新日時',
    type: 'date',
    width: 150,
    editable: false,
  },
  {
    field: 'remark',
    headerName: 'メモ',
    type: 'text',
    minWidth: 300,
    editable: true,
  },
];

const rows = [
  { id: '1', noteCreateTime: new Date(), noteUpdateTime: new Date(), remark: 'てすてすつと' },
  { id: '2', noteCreateTime: new Date(), noteUpdateTime: new Date(), remark: 'てすてすつと' },

];


export const Remarks = () => {
  return (
    <>
      <PageSubTitle label="備考欄" />
      <Grid item>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Grid>
    </>
  );
};