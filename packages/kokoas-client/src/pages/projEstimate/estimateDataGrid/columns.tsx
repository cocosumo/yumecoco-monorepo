import { DataGridProps, textEditor } from 'react-data-grid';
import { roundTo } from 'libs';
import { ReactNode } from 'react';
import { TItem } from '../schema';
import { renderUnits } from './renderers/renderUnits';
import { renderMajorItem } from './renderers/renderMajorItem';
import { renderMiddleItem } from './renderers/renderMiddleItem';
import { renderMaterials } from './renderers/renderMaterials';

export type RowItem = TItem & { 
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


export const getColumns = (): MyColumn[] => [
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
    renderEditCell: renderMajorItem,
    
  },
  { 
    key: 'middleItem', 
    name: '中項目', 
    editable: true,
    frozen: true,
    width: 200,
    renderEditCell: renderMiddleItem,
  },
  { 
    key: 'material', 
    name: '部材', 
    editable: true,
    frozen: true,
    width: 150,
    editorOptions: {
      displayCellContent: true,
      commitOnOutsideClick: true,
    },
    renderEditCell: renderMaterials,
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
      const value = row.costPrice;
      if (isNaN(value)) {
        return value;
      }
      return (<RightAlignedDiv>
        {commaFormatter(value)}
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
      const value = row.quantity;
      if (isNaN(value)) {
        return value;
      }
      return (
        <RightAlignedDiv>
          {commaFormatter(value)}
        </RightAlignedDiv>);
    },
  },
  { 
    key: 'unit', 
    name: '単位', 
    editable: true,
    minWidth: 75,
    renderEditCell: renderUnits,
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
      const value = row.materialProfRate;
      if (isNaN(value)) {
        return value;
      }

      return (
        <RightAlignedDiv>
          {`${roundTo(+(value || 0), 2).toFixed(2)} %`}
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
      const value = row.unitPrice;
      if (isNaN(value)) {
        return value;
      }
      return (
        <RightAlignedDiv>
          {commaFormatter(roundTo(value))}
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
          {commaFormatter(roundTo(row.rowCostPrice))}
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
          {commaFormatter(roundTo(row.rowUnitPriceBeforeTax))}
        </RightAlignedDiv>);
    },
  },
  { 
    key: 'rowDetails', 
    name: '備考', 
    width: 'auto',
    renderEditCell: textEditor,
  },
 
];