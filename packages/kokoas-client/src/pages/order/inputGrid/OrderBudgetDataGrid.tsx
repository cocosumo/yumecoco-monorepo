import 'react-data-grid/lib/styles.css';
import DataGrid, { RenderRowProps } from 'react-data-grid';
import { useCallback, useMemo } from 'react';
import { RowItem, useColumns } from './useColumns';
import { OrderBudgetDataGridContainer } from './OrderBudgetDataGridContainer';
import { useChangeRows } from './useChangeRows';
import { KItem, TForm, TItem } from '../schema';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableRowRenderer } from './DraggableRowRenderer';
import { useTypedWatch } from '../hooks/useTypedRHF';
import { produce } from 'immer';
import { useDataGridKeyCellKeyDown } from 'kokoas-client/src/hooks/useDataGridKeyCellKeyDown';
import { useRowValues } from './useRowValues';

function rowKeyGetter(row: RowItem) {
  return String(row.itemId);
}

export const OrderBudgetDataGrid = () => {
  const {
    control,
    setValue,
  } = useFormContext<TForm>();

  const hasOnProcessContract = useWatch({
    name: 'hasOnProcessContract',
  });

  const fieldArrayHelpers = useFieldArray({
    name: 'items',
    control,
  });

  const items = useTypedWatch({
    name: 'items',
  }) as TForm['items'];

  const itemsWithIndex: RowItem[] = useMemo(() => {
    return items.map((item, index) => {
      return {
        ...item,
        index,
      };
    });
    
  }, [items]);

  const columns = useColumns();
  
  const {
    getNewRow,
  } = useRowValues();

  const {
    handleCellKeyDown,
    dataGridRef,
  } = useDataGridKeyCellKeyDown<TForm, TItem>({
    fieldArrayHelpers,
    columns,
    getNewRow,
  });

  const {
    handleRowChange,
    handleFill,
  } = useChangeRows();



  const renderRow = useCallback((key: React.Key, props: RenderRowProps<TItem>) => {

    function onRowReorder(fromIndex: number, toIndex: number) {
      const newRows = produce(items, draft => {
        const [removed] = draft.splice(fromIndex, 1);
        draft.splice(toIndex, 0, removed);
      }); 

      setValue('items', newRows);
    }

    return (
      <DraggableRowRenderer 
        key={key} {...props} 
        onRowReorder={onRowReorder}
        //contentEditable={!hasOnProcessContract}
      />);
  }, [setValue, items]);
  
  return (
    <OrderBudgetDataGridContainer> 
      <DndProvider backend={HTML5Backend} >
        <DataGrid 
          rowKeyGetter={rowKeyGetter}
          className='rdg-light' // enforce light theme 
          columns={columns} 
          ref={dataGridRef}
          rows={itemsWithIndex}
          defaultColumnOptions={{
            resizable: true,
            width: 'max-content',
          }}
          renderers={{ renderRow  }}
          onFill={handleFill}
          onRowsChange={(rows, changedRow) => {
            const {
              indexes,
              column,
            } = changedRow;
            const {
              key,
            } = column;

            handleRowChange(indexes, key as KItem, rows as RowItem[]);
          }} 
          style={{ height: '100%' }}
          onCellKeyDown={hasOnProcessContract ? undefined : handleCellKeyDown}
        />
      </DndProvider>
    </OrderBudgetDataGridContainer>
  );
};



/**
  * 
  * Note:
  * 
  * Kintone is throwing kintone-jserror when resizing the grid
  * when the parent is 100%.
  * 
  * Kintone suppresses "resize observer limit loop exception" so it's
  * likely that they are also experiencing this issue.
  * 
  * As a solution, I used a fixed width for the grid.  
  * Here, I set it to full width of the screen, minus the menu width.
  * 
  * Related Issue: https://github.com/adazzle/react-data-grid/pull/3261#issuecomment-1595213841
  * 
  * ~ras 2023-06-16
  */
