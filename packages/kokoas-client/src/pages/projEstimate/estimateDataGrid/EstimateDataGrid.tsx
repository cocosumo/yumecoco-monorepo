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
  },
 
];



export const EstimatesDataGrid = () => {
  //const [rows, setRows] = useState(baseRows);

  const { fields, update } = useFieldArray<TypeOfForm>({
    name: 'items',
  });

  // 残す。検証用
  console.log(fields);

  /**
  * 
  * Note:
  * 
  * Kintone is throwing kintone-jserror when resizing the grid
  * when the parent is 100%.
  * 
  * So we need a fixed width for the grid.  
  * Here, I set it to full width of the screen, minus the menu width.
  * 
  * TODO: Identify if the menu is open or not, and adjust the width accordingly.
  * ~ras 2023-06-16
  */

  return (
    <Box
      sx={{
        maxWidth: 'calc(100vw - 306px)',  
      }}
      height={'100%'}
    >  
      <DataGrid 
        rowKeyGetter={(row: RowItem ) => row.id}
        className='rdg-light' // enforce light theme 
        columns={columns} 
        rows={fields}
        defaultColumnOptions={{
          resizable: true,
          width: 150,
        }}
        onRowsChange={() => {

        }} 
        
      />
    </Box>
  );
};