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
      key: 'costPrice', 
      name: '原価', 
      cellClass: ({ index }) => {
        return itemErrors?.[index]?.costPrice ? 'error-cell' : '';
      },
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
        return (<RightAlignedDiv>
          {commaFormatter(value)}
        </RightAlignedDiv>);
      },
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
      cellClass: ({ index }) => {
        return itemErrors?.[index]?.materialProfRate ? 'error-cell' : '';
      },
      renderEditCell: renderNumber,
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
      cellClass: ({ index }) => {
        return itemErrors?.[index]?.unitPrice ? 'error-cell' : '';
      },
      renderEditCell: renderNumber,
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

  ], [itemErrors]);
};