import { CellKeyDownArgs, CellKeyboardEvent, DataGridHandle } from 'react-data-grid';
import { RowItem, getColumns } from './columns';
import { useRef } from 'react';
import { useFieldArray } from 'react-hook-form';
import { TForm } from '../schema';
import { useRowValues } from '../hooks';



/**
 * Handles the keydown event of the DataGrid
 * ここには、Datagridのkeydownイベントを処理する関数が入っている。
 * 
 */
export const useDataGridKeyCellKeyDown = (columns: ReturnType<typeof getColumns>) => {

  const fieldArrayHelpers = useFieldArray<TForm>({
    name: 'items',
  });

  const { 
    fields, 
    append, 
    remove,
    insert,
  }  = fieldArrayHelpers;

  const {
    getNewRow,
  } = useRowValues();

  const persistedRowIdx = useRef<number>(0);
  const dataGridRef = useRef<DataGridHandle>(null);

  const fieldsLength = fields.length;

  const handleCellKeyDown =  (
    args: CellKeyDownArgs<RowItem>, 
    event: CellKeyboardEvent,

  ) => {
    
    const { column, rowIdx } = args;
    const { idx, editable } = column;
    const { 
      key, 
      shiftKey,
    } = event;

    const {
      selectCell,
    } = dataGridRef.current || {};

    const preventDefault = () => {
      event.preventGridDefault();
      event.preventDefault();
    };
    
    if (!selectCell) return; // Datagrid is not ready yet
    persistedRowIdx.current = rowIdx;
    const isLastRow = rowIdx === fieldsLength - 1;
    const isLastCellOfRow = idx === columns.length - 1;
    //const isLastRowAndCell = isLastRow && isLastCellOfRow;

    /************
     * 編集モード
     ***********/
    if (args.mode === 'EDIT' ) {
      if (key === 'Enter') {
        // 編集中のセルで、Enterキーを押した場合、次のセルに移動する。
        if (isLastCellOfRow) {
          selectCell({ rowIdx: rowIdx + 1, idx: 0 });
        } else {
          selectCell({ rowIdx: args.rowIdx, idx: idx + 1 });
          preventDefault();
        }
      }
      return;
    }

    /*************
     * 選択モード 
     ************/
    if (shiftKey && key === 'Delete') {
      // 選択中のセルで、Shift + Deleteキーを押した場合、行を削除する。
      if (rowIdx === -1) return; // ヘッダーの場合、削除しない。
      remove(rowIdx);
      preventDefault();
      return;
    }

    if (key === 'Insert') {
      // 選択中のセルで、Insertキーを押した場合、行を追加する。
      insert(rowIdx, getNewRow());
      preventDefault();
      return;
    }
 
    if ((key === 'ArrowRight') && isLastCellOfRow) {
      // 右端のセルで、右キーを押した場合、次の行の左端のセルに移動する。
     
      if (fieldsLength === 0) return; // No rows
      if (rowIdx === -1) {
        // ヘッダーの場合、最初の行の左端のセルに移動する。
        selectCell({ rowIdx: 0, idx: 0 });
      } else {
        // データの場合、次の行の左端のセルに移動する。
        if (isLastRow) {
          // 最後の行の場合、行を追加する。
          append(getNewRow()); 
        } else {
          selectCell({ rowIdx: rowIdx + 1, idx: 0 });
        } 
      }

      preventDefault();
    } else if (key === 'ArrowLeft' && idx === 0) {
      // 左端のセルで、左キーを押した場合、前の行の右端のセルに移動する。
      if (rowIdx === -1) return;
      selectCell({ rowIdx: rowIdx - 1, idx: columns.length - 1 });
      preventDefault();
    } else if (key === 'Enter' && !editable) {
      // 編集できないセルで、Enterキーを押した場合、次のセルに移動する。
      selectCell({ rowIdx, idx: idx + 1 });
    }
  
  };

  return {
    handleCellKeyDown, 
    dataGridRef,
    fieldArrayHelpers,
  };
};