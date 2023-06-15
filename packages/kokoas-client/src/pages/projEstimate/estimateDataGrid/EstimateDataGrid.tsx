import { useFieldArray } from 'react-hook-form';
import { KRowFields, TypeOfForm } from '../form';
import { Box } from '@mui/material';
import 'react-data-grid/lib/styles.css';
import DataGrid, { DataGridProps, textEditor   } from 'react-data-grid';
import { ReactNode, useState } from 'react';

type MyColumn =  DataGridProps<any, any, any>['columns'][number] & {
  key: KRowFields;
};

type RowItem = KRowFields & { id: string };

const commaFormatter = (value: string | number) =>  Number(value).toLocaleString();

const RightAlignedDiv = ({ children }:{ children: ReactNode }) => {
  return (
    <div style={{ textAlign: 'right' }}>
      {children}
    </div>);
};


const columns: MyColumn[] = [
  { key: 'majorItem', 
    name: '大項目', 
    editable: true, 
    sortable: true, 
    resizable: true, 
    renderEditCell: textEditor,
    
  },
  { 
    key: 'middleItem', 
    name: '中項目', 
    editable: true,
    renderEditCell: textEditor,
  },
  { 
    key: 'material', 
    name: '部材', 
    editable: true,
    renderEditCell: textEditor,
  },
  { 
    key: 'materialDetails', 
    name: '部材備考', 
    editable: true,
    renderEditCell: textEditor,
  },
  { 
    key: 'costPrice', 
    name: '原価', 
    editable: true,
    renderEditCell: textEditor,
    renderHeaderCell: ({ column }) => (
      <RightAlignedDiv>
        {column.name}
      </RightAlignedDiv>),
    renderCell: ({ row }) => (
      <RightAlignedDiv>
        {commaFormatter(row.costPrice)}
      </RightAlignedDiv>),
  },
  { 
    key: 'quantity', 
    name: '数量', 
    editable: true,
    renderEditCell: textEditor,
    renderHeaderCell: ({ column }) => (
      <RightAlignedDiv>
        {column.name}
      </RightAlignedDiv>),
    renderCell: ({ row }) => {
      return (
        <RightAlignedDiv>
          {commaFormatter(row.quantity)}
        </RightAlignedDiv>);
    },
  },
  { 
    key: 'unit', 
    name: '単位', 
    editable: true,
    renderEditCell: textEditor,
  },
];

const baseRows: Partial<Record<RowItem, string>>[] = [
  { id: '1', majorItem: 'Hello', middleItem: 'World', costPrice: '1000'  },
  { id: '2', majorItem: 'Hello', middleItem: 'World'  },
];

export const EstimatesDataGrid = () => {
  const [rows, setRows] = useState(baseRows);

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
        rowKeyGetter={(row: RowItem ) => row.id}
        className='rdg-light' // enforce light theme 
        columns={columns} 
        rows={rows}
        onRowsChange={setRows}
      />
    </Box>
  );
};