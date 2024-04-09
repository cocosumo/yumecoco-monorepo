import { CellKeyDownArgs, CellKeyboardEvent, Column, DataGridHandle } from 'react-data-grid';
import { RowItem } from './useColumns';
import { useRef } from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';
import { TForm } from '../schema';
import { useRowValues } from './useRowValues';
import { useTypedFormContext } from '../hooks/useTypedRHF';


/**
 * Handles the keydown event of the DataGrid
 * ここには、Datagridのkeydownイベントを処理する関数が入っている。
 * 
 */
export const useDataGridKeyCellKeyDown = (
  fieldArrayHelpers: UseFieldArrayReturn<TForm>,
  columns: Column<RowItem>[],
) => {

  const { setValue } = useTypedFormContext();

  const { 
    fields, 
    append, 
    remove,
    insert,
  }  = fieldArrayHelpers;

  const {
    getNewRow,
  } = useRowValues();

  const dataGridRef = useRef<DataGridHandle>(null);
  
  const fieldsLength = fields.length;

  
  const handleCellKeyDown =  (
    args: CellKeyDownArgs<RowItem>, 
    event: CellKeyboardEvent,

  ) => {

    const { column, rowIdx, row } = args;
    const { idx, editable  } = column;
  
    const { 
      key, 
      shiftKey,
      ctrlKey,
      altKey,
    } = event;

    const {
      selectCell,
    } = dataGridRef.current || {};

    if (!selectCell) return; // Datagrid is not ready yet


    const preventDefault = () => {
      event.preventGridDefault();
      event.preventDefault();
    };
    
    const isLastRow = rowIdx === fieldsLength - 1;
    const isLastCellOfRow = idx === columns.length - 1;
    //const isLastRowAndCell = isLastRow && isLastCellOfRow;
    const isHeadRow = rowIdx === -1;

    const goToNextEditableCell = () => {
      for (let i = idx + 1; i < columns.length; i++) {
        if (columns[i]?.editable) {
          selectCell({ rowIdx, idx: i }, true);
          return;
        }
      }
    };

    const goToPrevEditableCell = () => {
      for (let i = idx - 1; i > 0; i--) {
        if (columns[i]?.editable) {
          selectCell({ rowIdx, idx: i }, true);
          return;
        }
      }
    };

    /**********
     * 無視するキー
     **********/
    if (ctrlKey && key === 's') {
      preventDefault();
      return;
    } 

    /************
     * 編集モード
     ***********/
    if (args.mode === 'EDIT' ) {

      if (key === 'Enter' 
      || (!shiftKey && key === 'Tab')) {
        

        // 編集中のセルで、Enterキーを押した場合、次のセルに移動する。
        if (isLastCellOfRow) {
          selectCell({ rowIdx: rowIdx + 1, idx: 1 }, true);
        } else {
          goToNextEditableCell();
          preventDefault();

        }
      } else if (shiftKey && key === 'Tab') {

        if (rowIdx > 0 && idx === 1 ) {
          // 行の最初のセルで、Shift + Tabキーを押した場合、前の行の最後のセルに移動する。
          selectCell({ rowIdx: rowIdx - 1, idx: columns.length - 1 }, true);
        } else if (rowIdx === 0 && idx === 1) {
          // 最初の行の場合、最後の行の最後のセルに移動する。
          selectCell({ rowIdx: fieldsLength - 1, idx: columns.length - 1 }, true);
        
        } else {
          // 編集中のセルで、Shift + Tabキーを押した場合、前のセルに移動する。
          goToPrevEditableCell();
          preventDefault();

        }
        
      }
      
      return;
    }

    /*************
     * 選択モード 
     ************/


    if (altKey && key === 'v') {
      // 選択中のセルで、行をコピーする。
      if (isHeadRow) return;
      insert(rowIdx, { ...row, itemId: '' });
      preventDefault();
      return;
    }

    if (!shiftKey && key === 'Insert') {
      // 選択中のセルで、行を追加する。
      insert(rowIdx + 1, getNewRow());
      preventDefault();
      return;
    }

    if (altKey && key === 'b') {
      // 選択中のセルで、行を削除する。
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
        const rowItemKey = `items.${rowIdx}.${column.key}` as 'items.0.majorItem';
        setValue(rowItemKey, '');
        selectCell({ rowIdx, idx });
      }

      /* if (!isLastCellOfRow) {
        selectCell({ rowIdx, idx: idx + 1 }, true);
      } else {
        if (!isLastRow) {
          selectCell({ rowIdx: rowIdx + 1, idx: 0 }, true);
        } else {
          selectCell({ rowIdx, idx }, true);
        } 
        
      } */
      
      preventDefault();
      return;
    }
 
    if ((key === 'ArrowRight') && isLastCellOfRow) {
      // 右端のセルで、右キーを押した場合、次の行の左端のセルに移動する。
     
      if (fieldsLength === 0) return; // No rows
      if (isHeadRow) {
        // ヘッダーの場合、最初の行の左端のセルに移動する。
        selectCell({ rowIdx: 0, idx: 0 }, true);
      } else {
        // データの場合、次の行の左端のセルに移動する。
        if (isLastRow) {
          // 最後の行の場合、行を追加する。
          append(getNewRow()); 
        } else {
          selectCell({ rowIdx: rowIdx + 1, idx: 0 }, true);
        } 
      }

      preventDefault();
      return;
    }
    
    if (key === 'ArrowLeft' && idx === 0) {
      // 左端のセルで、左キーを押した場合、前の行の右端のセルに移動する。
      if (rowIdx === -1) return;
      selectCell({ rowIdx: rowIdx - 1, idx: columns.length - 1 });
      preventDefault();
      return;
    } 
    
    if (key === 'Enter' && !editable) {
      // 編集できないセルで、Enterキーを押した場合、次のセルに移動する。
      selectCell({ rowIdx, idx: idx + 1 });
      return;
    }

    if (key === 'Home') {
      // Homeキーを押した場合、行の最初のセルに移動する。
      selectCell({ rowIdx, idx: 1 });
      preventDefault();
      return;
    }

    if (key === 'End') {
      // Endキーを押した場合、行の最後のセルに移動する。
      selectCell({ rowIdx, idx: columns.length - 1 });
      preventDefault();
      return;
    }

    const allowedKeys = [
      'ArrowDown',
      'ArrowUp',
      'ArrowRight',
      'ArrowLeft',
      'Tab',
      'Enter',
      'Delete',
      'Insert',
    ];

    if (!allowedKeys.includes(key)) {

      preventDefault();
    }

  };

  return {
    handleCellKeyDown, 
    dataGridRef,
    fieldArrayHelpers,
  };
};