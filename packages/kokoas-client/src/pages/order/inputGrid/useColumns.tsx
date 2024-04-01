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
import { renderTaxType } from './renderers/renderTaxType';
import { Typography } from '@mui/material';

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
      width: 35,
      minWidth: 40,
      cellClass: 'no-ellipsis',
      renderCell: renderCheckbox,
    },
    { 
      key: 'status', 
      name: '状態', 
      sortable: true, 
      resizable: true, 
      frozen: true,
      cellClass: 'select',
      editable: false,
      width: 70,
      minWidth: 100,    
    },
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
      key: 'supplierName', 
      name: '業者名', 
      editable: false,
      width: 150,
    },
    { 
      key: 'orderId', 
      name: '発注番号', 
      editable: false,
      width: 100,
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
      key: 'rowCostPriceAfterTax', 
      name: '発注金額（税込）', 
      editable: false,
      renderHeaderCell: ({ column }) => (
        <RightAlignedDiv>
          {column.name}
        </RightAlignedDiv>),
      renderCell: ({ row }) => {
        return (
          <RightAlignedDiv>
            {commaFormatter(roundTo(row.rowCostPriceAfterTax))}
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