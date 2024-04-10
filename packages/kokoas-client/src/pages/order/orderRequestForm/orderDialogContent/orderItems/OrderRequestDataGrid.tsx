import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { RowItem, useColumns } from './useColumns';

import { OrderRequestDataGridContainer } from './OrderRequestDataGridContainer';
import { useOrderWatch } from '../../hooks/useOrderRHF';
import { TOrderItem } from '../../schema';

function rowKeyGetter(row: RowItem) {
  return String(row.itemId);
}

export const OrderRequestDataGrid = () => {
  
  const items = useOrderWatch({
    name: 'selectedItems',
  }) as TOrderItem[];
  const columns = useColumns();

  
  return (
    <OrderRequestDataGridContainer> 
      <DataGrid 
        rowKeyGetter={rowKeyGetter}
        className='rdg-light' // enforce light theme 
        columns={columns} 
        rows={items}
        defaultColumnOptions={{
          resizable: true,
          width: 'max-content',
        }}
        /* onRowsChange={(rows, changedRow) => {
          const {
            indexes,
            column,
          } = changedRow;
          const {
            key,
          } = column;

          handleRowChange(indexes, key as KItem, rows as RowItem[]);
        }} */ 
        style={{ height: '100%' }}
        //onCellKeyDown={hasOnProcessContract ? undefined : handleCellKeyDown}
      />
    </OrderRequestDataGridContainer>
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
