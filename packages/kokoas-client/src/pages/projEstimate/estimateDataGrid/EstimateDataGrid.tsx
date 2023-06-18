import 'react-data-grid/lib/styles.css';
import DataGrid, { CellKeyDownArgs, CellKeyboardEvent, DataGridHandle } from 'react-data-grid';
import { useMemo, useRef } from 'react';
import { RowItem, getColumns } from './columns';
import { EstimateDataGridContainer } from './EstimateDataGridContainer';
import { useChangeRows } from '../hooks/useChangeRows';
import { KItem } from '../schema';



export const EstimatesDataGrid = () => {
  const {
    handleRowChange,
    fields,
  } = useChangeRows();
  const dataGridRef = useRef<DataGridHandle>(null);
  

  const fieldsWithIndex =  useMemo(
    ()=>{
      return fields.map((field, index) => ({ ...field, index }));
    }, 
    [fields],
  );

  const columns = useMemo(() => getColumns(), []);

  const fieldsLength = fields.length;

  function handleCellKeyDown(args: CellKeyDownArgs<RowItem>, event: CellKeyboardEvent) {
   
    const { column, rowIdx } = args;
    const { idx, editable } = column;
    const { key } = event;

    const {
      selectCell,
    } = dataGridRef.current || {};

    const preventDefault = () => {
      event.preventGridDefault();
      event.preventDefault();
    };
    

    if (!selectCell) return;
    if (args.mode === 'EDIT') {

      dataGridRef.current?.selectCell({ rowIdx: args.rowIdx, idx: idx + 1 });
      return;
    }


    if ((key === 'ArrowRight' || key === 'Enter') && idx === columns.length - 1) {
      if (fieldsLength === 0) return;
      if (rowIdx === -1) {
        selectCell({ rowIdx: 0, idx: 0 });
      } else {
        if (rowIdx === fieldsLength - 1) return;
        selectCell({ rowIdx: rowIdx + 1, idx: 0 });
      }
      preventDefault();
    } else if (key === 'ArrowLeft' && idx === 0) {
      if (rowIdx === -1) return;
      selectCell({ rowIdx: rowIdx - 1, idx: columns.length - 1 });
      preventDefault();
    } else if (key === 'Enter' && !editable) {

      selectCell({ rowIdx, idx: idx + 1 });
      //preventDefault();
    }
  
  }

  return (
    <EstimateDataGridContainer>  
      <DataGrid 
        rowKeyGetter={(row: RowItem ) => row.id}
        className='rdg-light' // enforce light theme 
        columns={columns} 
        ref={dataGridRef}
        rows={fieldsWithIndex}
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
          const changedIndex = indexes[0];

          handleRowChange(changedIndex, key as KItem, rows);
        }} 
        style={{ height: '100%' }}
        onCellKeyDown={handleCellKeyDown}        
      />
    </EstimateDataGridContainer>
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