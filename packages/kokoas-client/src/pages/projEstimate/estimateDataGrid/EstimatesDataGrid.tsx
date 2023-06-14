import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useFieldArray } from 'react-hook-form';
import { KRowFields, TypeOfForm } from '../form';
import { Box } from '@mui/material';

type MyGridColDef  = GridColDef & {
  field: KRowFields 
};


const rows: GridRowsProp = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'MUI', col2: 'is Amazing' },
];


const columns: MyGridColDef[] = [
  { field: 'majorItem', headerName: '大項目', editable: true },
  { field: 'middleItem', headerName: '中項目', editable: true },
  { field: 'material', headerName: '中項目', editable: true },
  { field: 'materialDetails', headerName: '部材備考', editable: true },
  { field: 'costPrice', headerName: '原価', editable: true },
  { field: 'quantity', headerName: '数量', maxWidth: 30, editable: true },
  { field: 'unit', headerName: '単位', maxWidth: 40, editable: true },
  { field: 'materialProfRate', headerName: '粗利率', maxWidth: 20, editable: true },
  { field: 'unitPrice', headerName: '単価', editable: true },
  { field: 'rowUnitPriceAfterTax', headerName: '税込金額', editable: true },
  { field: 'rowDetails', headerName: '備考', editable: true },
];

export const EstimatesDataGrid = () => {
  const { fields } = useFieldArray<TypeOfForm>({
    name: 'items',
  });

  console.log(fields);


  return (
    <Box
      width={'100%'}
      height={'100%'}
    >  
      <DataGrid 
        density='compact'
        disableColumnFilter
        disableColumnMenu
        disableColumnSelector
        rows={rows} columns={columns}
      />
    </Box>
  );
};