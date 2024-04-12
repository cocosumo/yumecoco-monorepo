import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import { RowItem, useColumns } from './useColumns';

import { OrderRequestDataGridContainer } from './OrderRequestDataGridContainer';
import { useOrderWatch } from '../../hooks/useOrderRHF';
import { TOrderItem } from '../../schema';
import { useChangeRows } from './useChangeRows';
import { KItem } from '../../../schema';
import { useDataGridKeyCellKeyDown } from './useDataGridKeyCellKeyDown';

function rowKeyGetter(row: RowItem) {
  return String(row.itemId);
}

export const OrderRequestDataGrid = () => {
  
  const items = useOrderWatch({
    name: 'selectedItems',
  }) as TOrderItem[];

  const columns = useColumns();

  const { handleRowChange } = useChangeRows();

  const { 
    handleCellKeyDown,
    dataGridRef,
  } = useDataGridKeyCellKeyDown(columns);

  
  return (
    <OrderRequestDataGridContainer> 
      <DataGrid 
        ref={dataGridRef}
        rowKeyGetter={rowKeyGetter}
        className='rdg-light' // enforce light theme 
        columns={columns} 
        rows={items}
        defaultColumnOptions={{
          resizable: true,
          width: 'max-content',
        }}
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
        onCellKeyDown={handleCellKeyDown}
      />
    </OrderRequestDataGridContainer>
  );
};