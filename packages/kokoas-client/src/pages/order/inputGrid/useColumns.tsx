import { DataGridProps } from 'react-data-grid';
import { roundTo } from 'libs';
import { ReactNode, useMemo } from 'react';
import { TForm, TItem } from '../schema';
import { renderUnits } from './renderers/renderUnits';
import { renderMajorItem } from './renderers/renderMajorItem';
import { renderMiddleItem } from './renderers/renderMiddleItem';
import { renderMaterials } from './renderers/renderMaterials';
import { useFormState } from 'react-hook-form';
import { renderNumber } from './renderers/renderNumber';
import { renderCheckbox } from './renderers/renderCheckBox';
import { renderText } from './renderers/renderText';

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

export const useColumns = (): MyColumn[] => {
  const {
    errors,
  } = useFormState<TForm>();


  const itemErrors = errors?.items;
  
  
  return useMemo(() => [
    {
      key: 'index',
      name: '',
      editable: false,
      frozen: true,
      resizable: false,
      headerCellClass: 'index-header',
      width: 35,
      minWidth: 35,
      renderCell: renderCheckbox,
    },
    { 
      key: 'majorItem', 
      name: '大項目', 
      sortable: true, 
      resizable: true, 
      frozen: true,
      cellClass: 'select',
      width: 150,
      minWidth: 100,
      renderEditCell: renderMajorItem,
    
    },
    { 
      key: 'middleItem', 
      name: '中項目', 
      frozen: true,
      width: 150,
      renderEditCell: renderMiddleItem,
    },
    { 
      key: 'material', 
      name: '部材', 
      frozen: true,
      width: 150,
      renderEditCell: renderMaterials,
    },
    { 
      key: 'supplierName', 
      name: '業者名', 
      editable: false,
      width: 150,
    },
    { 
      key: 'orderId', 
      name: '発注番号', 
      editable: false,
      width: 150,
    },
    { 
      key: 'quantity', 
      name: '数量', 
      cellClass: ({ index }) => {
        return itemErrors?.[index]?.quantity ? 'error-cell' : '';
      },
      renderEditCell: renderNumber,
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
      minWidth: 75,
      renderEditCell: renderUnits,
    },
    { 
      key: 'materialProfRate', 
      name: '粗利率', 
      editable: false,
    },
    { 
      key: 'unitPrice', 
      name: '単価', 
      editable: false,
    },
    { 
      key: 'rowCostPriceBeforeTax', 
      name: '発注金額（税抜）', 
      editable: false,
      renderHeaderCell: ({ column }) => (
        <RightAlignedDiv>
          {column.name}
        </RightAlignedDiv>),
      renderCell: ({ row }) => {
        return (
          <RightAlignedDiv>
            {commaFormatter(roundTo(row.rowCostPriceBeforeTax))}
          </RightAlignedDiv>);
      },
    },
    // TODO 課税・非課税
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
      key: 'rowRemarks', 
      name: '備考', 
      editable: true,
      width: 200,
      renderEditCell: renderText,
    },

  ], [itemErrors]);
};