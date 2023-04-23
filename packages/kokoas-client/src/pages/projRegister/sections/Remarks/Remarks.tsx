import { Grid } from '@mui/material';
import { PageSubTitle } from 'kokoas-client/src/components';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';

const columns: GridColDef<TypeOfForm['remarks'][number]>[] = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90, 
  },
  {
    field: 'noteCreateTime',
    headerName: '作成日時',
    width: 100,
    type: 'date',
    editable: false,
  },
  {
    field: 'noteUpdateTime',
    headerName: '更新日時',
    type: 'date',
    width: 100,
    editable: false,
  },
  {
    field: 'remark',
    headerName: 'メモ',
    type: 'text',
    minWidth: 500,
    editable: true,
    hideable: false,
  },
];


export const Remarks = () => {
  const { values: { remarks } } = useFormikContext<TypeOfForm>();
  console.log(remarks);

  return (
    <>
      <PageSubTitle label="備考欄" />
      <Grid item sx={{ height: 400, width: '100%' }}>

        <DataGrid
            
          rows={remarks}
          columns={columns}
          onCellEditStop={(params, idx, details ) => {
            console.log('onCellEditStop', params, idx, details);
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />

      </Grid>
    </>
  );
};