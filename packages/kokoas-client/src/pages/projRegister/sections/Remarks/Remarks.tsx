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
    flex: 1,
    editable: true,
    hideable: false,
  },
];


export const Remarks = () => {
  const { 
    values: { remarks }, 
    setFieldValue,
  } = useFormikContext<TypeOfForm>();
  console.log(remarks);

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
                console.log('processRowUpdate', params);
                return params;
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
            />)}
        />
        

      </Grid>
    </>
  );
};