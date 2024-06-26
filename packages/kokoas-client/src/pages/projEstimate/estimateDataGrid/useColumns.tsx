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
import { renderCheckbox } from './renderers/renderCheckBox';

export type RowItem = TItem;

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

  const [
    contractId,
    items,
  ] = useWatch<TForm>({
    name: [
      'contractId',
      'items',
    ],
  }) as [string, TItem[]];

  const {
    errors,
  } = useFormState<TForm>();

  const itemsMap  = useMemo(() => {
    
    return items.reduce<Record<string, number>>((acc, item, index) => {
      
      if (!item.itemId) return acc;
      
      acc[item.itemId] = index;
      return acc;
    }
    , {});
  }, [items]);


  const itemErrors = errors?.items;

  const isEnabled = !contractId;
  
  
  return useMemo(() => {

    return [
      {
        key: 'selected',
        name: '',
        frozen: true,
        resizable: false,
        width: 35,
        minWidth: 40,
        cellClass: 'no-ellipsis',
        renderCell: renderCheckbox,
      },
      {
        key: 'itemId',
        name: 'No.',
        editable: false,
        frozen: true,
        resizable: false,
        headerCellClass: 'index-header',
        width: 35,
        minWidth: 35,
        renderCell: ({ rowIdx }) => rowIdx + 1,
      },
      { 
        key: 'majorItem', 
        name: '大項目', 
        editable: isEnabled, 
        sortable: true, 
        resizable: true, 
        frozen: true,
        width: 150,
        minWidth: 100,
        cellClass: ({
          itemId,
        }) => {
          return itemErrors?.[itemsMap[itemId]]?.majorItem ? 'error-cell' : '';
        },
        renderEditCell: renderMajorItem,
      },
      { 
        key: 'middleItem', 
        name: '中項目', 
        editable: isEnabled,
        frozen: true,
        width: 150,
        renderEditCell: renderMiddleItem,
      },
      { 
        key: 'material', 
        name: '部材', 
        editable: isEnabled,
        frozen: true,
        width: 150,
        renderEditCell: renderMaterials,
      },
      { 
        key: 'materialDetails', 
        name: '部材備考', 
        editable: isEnabled,
        width: 150,
        renderEditCell: renderText,
      },
      { 
        key: 'costPrice', 
        name: '原価', 
        editable: isEnabled,
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
 
    ];
  }, [isEnabled, itemErrors, itemsMap]);
};