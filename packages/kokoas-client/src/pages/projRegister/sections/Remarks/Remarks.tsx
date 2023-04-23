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
    width: 150,
    type: 'dateTime',
    editable: false,
  },
  {
    field: 'noteUpdateTime',
    headerName: '更新日時',
    type: 'dateTime',
    width: 150,
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
  const { 
    values: { remarks }, 
    setFieldValue,
  } = useFormikContext<TypeOfForm>();

  return (
    <>
      <PageSubTitle label="備考欄" />
      <Grid item sx={{ height: 400, width: '100%' }}>
        <FieldArray 
          name={fieldName}
          render={() => (
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
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />)}
        />
        

      </Grid>
    </>
  );
};