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
    update,
  }  = fieldArrayHelpers;

  const {
    getNewRow,
  } = useRowValues();

  const persistedState = useRef({
    rowIdx: 0,
    idx: 0,
    length: fields.length,
  });

  const dataGridRef = useRef<DataGridHandle>(null);
  
  const fieldsLength = fields.length;

  
  const handleCellKeyDown =  (
    args: CellKeyDownArgs<RowItem>, 
    event: CellKeyboardEvent,

  ) => {

    const { column, rowIdx, row } = args;
    const { idx, editable } = column;
    const { 
      key, 
      shiftKey,
    } = event;

    const {
      selectCell,
    } = dataGridRef.current || {};

    if (!selectCell) return; // Datagrid is not ready yet


    const preventDefault = () => {
      event.preventGridDefault();
      event.preventDefault();
    };
    
    persistedState.current = {
      rowIdx,
      length: fieldsLength,
      idx,
    };
    const isLastRow = rowIdx === fieldsLength - 1;
    const isLastCellOfRow = idx === columns.length - 1;
    //const isLastRowAndCell = isLastRow && isLastCellOfRow;
    const isHeadRow = rowIdx === -1;

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
    if (shiftKey && key === 'Insert') {
      // 選択中のセルで、Shift + Insertキーを押した場合、行をコピーする。
      if (isHeadRow) return;
      insert(rowIdx, { ...row });
      preventDefault();
      return;
    }

    if (!shiftKey && key === 'Insert') {
      // 選択中のセルで、Insertキーを押した場合、行を追加する。
      insert(rowIdx, getNewRow());
      preventDefault();
      return;
    }

    if (shiftKey && key === 'Delete') {
      // 選択中のセルで、Shift + Deleteキーを押した場合、行を削除する。
      if (isHeadRow) return; // ヘッダーの場合、削除しない。
      remove(rowIdx);
      selectCell({ rowIdx: rowIdx - 1, idx });
      preventDefault();
      return;
    }


    if (!shiftKey && key === 'Delete') {
      // 選択中のセルで、Deleteキーを押した場合、値をクリアする。
      if (isHeadRow) return; // ヘッダーの場合、クリアしない。

      if (editable) {
        update(rowIdx, { ...row, [column.key]: '' });
      }

      if (!isLastCellOfRow) {
        selectCell({ rowIdx, idx: idx + 1 });
      } else {
        if (!isLastRow) {
          selectCell({ rowIdx: rowIdx + 1, idx: 0 });
        } else {
          selectCell({ rowIdx, idx });
        } 
        
      }
      
      preventDefault();
      return;
    }
 
    if ((key === 'ArrowRight') && isLastCellOfRow) {
      // 右端のセルで、右キーを押した場合、次の行の左端のセルに移動する。
     
      if (fieldsLength === 0) return; // No rows
      if (isHeadRow) {
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