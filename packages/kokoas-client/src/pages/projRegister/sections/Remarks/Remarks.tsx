import { Grid } from '@mui/material';
import { PageSubTitle } from 'kokoas-client/src/components';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FieldArray, useFormikContext } from 'formik';
import { KeysOfForm, TypeOfForm } from '../../form';


const fieldName: KeysOfForm =  'remarks';

const columns: GridColDef<TypeOfForm['remarks'][number]>[] = [
  {
    field: 'noteCreateTime',
    headerName: '作成日時',
    maxWidth: 120,
    type: 'dateTime',
    editable: false,
  },
  {
    field: 'noteUpdateTime',
    headerName: '更新日時',
    type: 'dateTime',
    maxWidth: 120,
    editable: false,
  },
  {
    field: 'remark',
    headerName: 'メモ',
    type: 'text',
    editable: true,
    hideable: false,
    flex: 1,
  },
];


export const Remarks = () => {
  const { 
    values: { remarks }, 
    setFieldValue,
  } = useFormikContext<TypeOfForm>();

  return (
    <>
      <PageSubTitle label="備考欄" />
      <Grid item sx={{ height: 400, width: '100%' }}>
        -
        <DataGrid
          rows={remarks}
          columns={columns}
          processRowUpdate={(params) => {
            setFieldValue(`${params.id}.remark`, params.remark);
            return params;
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'noteCreateTime', sort: 'desc' }],
            },
 
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          
        />
        

      </Grid>
    </>
  );
};