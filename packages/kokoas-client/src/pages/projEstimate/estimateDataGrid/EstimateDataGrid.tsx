import { useFieldArray } from 'react-hook-form';
import { KRowFields, TypeOfForm } from '../form';
import { Box } from '@mui/material';
import 'react-data-grid/lib/styles.css';
import DataGrid, { DataGridProps, textEditor   } from 'react-data-grid';
import { ReactNode } from 'react';
import { roundTo } from 'libs';

type MyColumn =  DataGridProps<any, any, any>['columns'][number] & {
  key: KRowFields;
};

type RowItem = KRowFields & { id: string };

const commaFormatter = (value: string | number) => {
  const parseValue = +value;
  if (isNaN(parseValue)) return value;

  return parseValue.toLocaleString();
};

const RightAlignedDiv = ({ children }:{ children: ReactNode }) => {
  return (
    <div style={{ textAlign: 'right' }}>
      {children}
    </div>);
};


const columns: MyColumn[] = [
  { 
    key: 'majorItem', 
    name: '大項目', 
    editable: true, 
    sortable: true, 
    resizable: true, 
    frozen: true,
    renderEditCell: textEditor,
    
  },
  { 
    key: 'middleItem', 
    name: '中項目', 
    editable: true,
    frozen: true,
    renderEditCell: textEditor,
  },
  { 
    key: 'material', 
    name: '部材', 
    editable: true,
    frozen: true,
    renderEditCell: textEditor,
  },
  { 
    key: 'materialDetails', 
    name: '部材備考', 
    editable: true,
    renderEditCell: textEditor,
    width: 300,
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
    renderCell: ({ row }) => {
      return (<RightAlignedDiv>
        {commaFormatter(row.costPrice)}
      </RightAlignedDiv>);
    },
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
  { 
    key: 'materialProfRate', 
    name: '粗利率', 
    editable: true,
    renderEditCell: textEditor,
    renderHeaderCell: ({ column }) => (
      <RightAlignedDiv>
        {column.name}
      </RightAlignedDiv>),
    renderCell: ({ row }) => {
      return (
        <RightAlignedDiv>
          {`${roundTo(+(row.materialProfRate || 0), 2)} %`}
        </RightAlignedDiv>);
    },
  },
  { 
    key: 'unitPrice', 
    name: '単価', 
    editable: true,
    renderEditCell: textEditor,
    renderHeaderCell: ({ column }) => (
      <RightAlignedDiv>
        {column.name}
      </RightAlignedDiv>),
    renderCell: ({ row }) => {
      return (
        <RightAlignedDiv>
          {commaFormatter(row.unitPrice)}
        </RightAlignedDiv>);
    },
  },
  { 
    key: 'rowUnitPriceBeforeTax', 
    name: '税抜金額', 
    editable: true,
    renderEditCell: textEditor,
    renderHeaderCell: ({ column }) => (
      <RightAlignedDiv>
        {column.name}
      </RightAlignedDiv>),
    renderCell: ({ row }) => {
      return (
        <RightAlignedDiv>
          {commaFormatter(row.rowUnitPriceBeforeTax)}
        </RightAlignedDiv>);
    },
  },
  { 
    key: 'rowDetails', 
    name: '備考', 
    editable: true,
    renderEditCell: textEditor,
    width: 300,
  },
 
];



export const EstimatesDataGrid = () => {
  //const [rows, setRows] = useState(baseRows);

  const { fields, update } = useFieldArray<TypeOfForm>({
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
        className='rdg-light fill-grid' // enforce light theme 
        columns={columns} 
        rows={fields}
        defaultColumnOptions={{
          resizable: true,
        }}
        onRowsChange={() => {

        }} 

      />
    </Box>
  );
};