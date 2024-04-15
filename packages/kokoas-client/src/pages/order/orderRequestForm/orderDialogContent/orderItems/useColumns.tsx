import { DataGridProps } from 'react-data-grid';
import { roundTo } from 'libs';
import { ReactNode, useMemo } from 'react';
import { useFormState } from 'react-hook-form';
import { Typography } from '@mui/material';
import { TItem } from 'kokoas-client/src/pages/order/schema';
import { renderMajorItem } from 'kokoas-client/src/pages/order/inputGrid/renderers/renderMajorItem';
import { renderMiddleItem } from 'kokoas-client/src/pages/order/inputGrid/renderers/renderMiddleItem';
import { renderMaterials } from 'kokoas-client/src/pages/order/inputGrid/renderers/renderMaterials';
import { renderNumber } from 'kokoas-client/src/pages/order/inputGrid/renderers/renderNumber';
import { renderUnits } from 'kokoas-client/src/pages/order/inputGrid/renderers/renderUnits';
import { renderTaxType } from 'kokoas-client/src/pages/order/inputGrid/renderers/renderTaxType';
import { renderText } from 'kokoas-client/src/pages/order/inputGrid/renderers/renderText';
import { TOrderForm } from '../../schema';

export type RowItem = TItem & {
  index: number;
}; // TODO: Remove this type alias if not needed

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
  } = useFormState<TOrderForm>();


  const itemErrors = errors?.selectedItems;
  
  
  return useMemo(() => [
    { 
      key: 'majorItem', 
      name: '大項目', 
      sortable: true, 
      resizable: true, 
      frozen: true,
      editable: true,
      width: 150,
      minWidth: 100,
      cellClass: ({ index }) => {
        return itemErrors?.[index]?.majorItem ? 'error-cell' : '';
      },
      renderEditCell: renderMajorItem,
    
    },
    { 
      key: 'middleItem', 
      name: '中項目', 
      frozen: true,
      editable: true,
      width: 150,
      renderEditCell: renderMiddleItem,
    },
    { 
      key: 'material', 
      name: '部材', 
      frozen: true,
      editable: true,
      width: 150,
      renderEditCell: renderMaterials,
    },
    { 
      key: 'quantity', 
      name: '数量', 
      editable: true,
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
      editable: true,
      width: 68,
      renderCell: ({ row }) => (
        <Typography fontSize={10} height={'100%'} alignContent={'center'}>
          {row.unit}
        </Typography>),
      renderEditCell: renderUnits,
    },
    { 
      key: 'costPrice', 
      name: '単価', 
      width: 100,
      editable: true,
      renderEditCell: renderNumber,
      renderHeaderCell: ({ column }) => (
        <RightAlignedDiv>
          {column.name}
        </RightAlignedDiv>),
      renderCell: ({ row }) => {
        const value = row.costPrice;
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
    {
      key: 'taxRate',
      name: '税区分',
      editable: true,
      minWidth: 70,
      renderEditCell: renderTaxType,
      renderCell: ({ row }) => {
        return (
          <Typography fontSize={12} height={'100%'} alignContent={'center'}>
            {row.taxRate === 0 ? '非課税' : `課税 (${row.taxRate * 100}%)`}
          </Typography>);
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