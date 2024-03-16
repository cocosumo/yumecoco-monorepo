import { DataGridProps } from 'react-data-grid';
import { roundTo } from 'libs';
import { ReactNode, useMemo } from 'react';
import { TForm, TItem } from '../schema';
import { renderUnits } from './renderers/renderUnits';
import { renderMajorItem } from './renderers/renderMajorItem';
import { renderMiddleItem } from './renderers/renderMiddleItem';
import { renderMaterials } from './renderers/renderMaterials';
import { useFormState, useWatch } from 'react-hook-form';
import { renderText } from './renderers/renderText';
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
  const [
    contractId,
  ] = useWatch<TForm>({
    name: [
      'contractId',
    ],
  });

  const itemErrors = errors?.items;
  const isEnabled = !contractId;
  
  
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
      editable: isEnabled, 
      sortable: true, 
      resizable: true, 
      frozen: true,
      cellClass: 'select',
      renderEditCell: renderMajorItem,
    
    },
    { 
      key: 'middleItem', 
      name: '中項目', 
      editable: isEnabled,
      frozen: true,
      width: 200,

      editorOptions: {
        displayCellContent:false,
        commitOnOutsideClick: true,
      },
      renderEditCell: renderMiddleItem,
    },
    { 
      key: 'material', 
      name: '部材', 
      editable: isEnabled,
      frozen: true,
      width: 150,
      editorOptions: {
        displayCellContent: false,
        commitOnOutsideClick: true,
      },
      renderEditCell: renderMaterials,
    },
    { 
      key: 'materialDetails', 
      name: '部材備考', 
      editable: isEnabled,
      width: 150,
      editorOptions: {
        displayCellContent: false,
        commitOnOutsideClick: true,
      },
      renderEditCell: renderText,
    },
    { 
      key: 'costPrice', 
      name: '原価', 
      editable: isEnabled,
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
      editable: isEnabled,
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
      editable: isEnabled,
      minWidth: 75,
      renderEditCell: renderUnits,
    },
    { 
      key: 'materialProfRate', 
      name: '粗利率', 
      editable: isEnabled,
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
      editable: isEnabled,
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
      editable: isEnabled,
      renderEditCell: renderText,
    },
 
  ], [itemErrors, isEnabled]);
};