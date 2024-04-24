import DataGrid from 'react-data-grid';
import { InputGridContainer } from './InputGridContainer';
import { useDataGridKeyCellKeyDown } from 'kokoas-client/src/hooks/useDataGridKeyCellKeyDown';
import { TInvoiceForm, TInvoiceItem } from '../../../schema';
import { RowItem, useColumns } from './useColumns';
import { useChangeRows } from '../../../../inputGrid/useChangeRows';
import { KItem } from '../../../../schema';
import { useTypedFormContext } from 'kokoas-client/src/pages/order/hooks/useTypedRHF';
import { useWatch } from 'react-hook-form';

function rowKeyGetter(row: RowItem) {
  return String(row.itemId);
}


export const InvoiceInputGrid = () => {
  const { control } = useTypedFormContext();

  const items = useWatch({
    control,
    name: 'items',
  });


  const columns = useColumns();
  const { handleRowChange } = useChangeRows();

  const {
    dataGridRef,
    handleCellKeyDown,
  } = useDataGridKeyCellKeyDown<TInvoiceForm, TInvoiceItem>({
    columns,
    itemsFieldName: 'items',
    enableDeleteRow: false,
    enableInsertRow: false,
    enableCopyRow: false,
  });

  return (
    <InputGridContainer>
      <DataGrid 
        ref={dataGridRef}
        rowKeyGetter={rowKeyGetter}
        className='rdg-light' // enforce light theme
        columns={columns}
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
        rows={items}
        style={{ height: '100%' }}
        onCellKeyDown={handleCellKeyDown}
      />
    </InputGridContainer>
  );
};