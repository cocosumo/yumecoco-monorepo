import { useFieldArray } from 'react-hook-form';
import { Item, KRowFields, TypeOfForm } from '../form';
import { Box } from '@mui/material';


import 'react-data-grid/lib/styles.css';
import DataGrid, { DataGridProps  } from 'react-data-grid';

type MyColumn =  DataGridProps<any, any, any>['columns'][number] & {
  key: KRowFields;
};

const columns: MyColumn[] = [
  { key: 'majorItem', name: '大項目', 
    editable: true, frozen: false, sortable: true, resizable: true, width: 100  },
  { key: 'middleItem', name: '中項目', editable: true },
/*   { key: 'material', name: '中項目', editable: true },
  { key: 'materialDetails', name: '部材備考', editable: true },
  { key: 'costPrice', name: '原価', editable: true },
  { key: 'quantity', name: '数量', maxWidth: 30, editable: true },
  { key: 'unit', name: '単位', maxWidth: 40, editable: true },
  { key: 'materialProfRate', name: '粗利率', maxWidth: 20, editable: true },
  { key: 'unitPrice', name: '単価', editable: true },
  { key: 'rowUnitPriceAfterTax', name: '税込金額', editable: true },
  { key: 'rowDetails', name: '備考', editable: true }, */
];

const rows: Partial<Record<KRowFields, string>>[] = [
  { majorItem: 'Hello', middleItem: 'World'  },
];

export const EstimatesDataGrid = () => {
  const { fields } = useFieldArray<TypeOfForm>({
    name: 'items',
  });

  // 残す。検証用
  console.log(fields);


  return (
    <Box
      width={'100%'}
      height={'100%'}
    >  
      <DataGrid 
        className='rdg-light' // enforce light theme 
        columns={columns} 
        rows={rows}
        
      />
    </Box>
  );
};