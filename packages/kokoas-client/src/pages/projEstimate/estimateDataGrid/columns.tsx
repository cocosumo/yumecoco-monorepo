import { DataGridProps, textEditor } from 'react-data-grid';
import { Item } from '../form';
import { roundTo } from 'libs';
import { ReactNode } from 'react';

export type RowItem = Item & { 
  id: string,
  index: number,
};

type MyColumn =  DataGridProps<RowItem>['columns'][number] & {
  key: keyof RowItem;
};



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


export const columns: MyColumn[] = [
  {
    key: 'index',
    name: 'No.',
    editable: false,
    frozen: true,
    resizable: false,
    cellClass: 'index',
    headerCellClass: 'index-header',
    width: 35,
    minWidth: 35,
    renderCell: ({ row }) => row.index + 1,
  },
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
    width: 200,
    renderEditCell: textEditor,
  },
  { 
    key: 'material', 
    name: '部材', 
    editable: true,
    frozen: true,
    width: 150,
    renderEditCell: textEditor,
  },
  { 
    key: 'materialDetails', 
    name: '部材備考', 
    editable: true,
    minWidth: 150,
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
    key: 'rowCostPrice', 
    name: '原価金額', 
    editable: false,
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
    editable: false,
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
    renderEditCell: textEditor,
  },
 
];