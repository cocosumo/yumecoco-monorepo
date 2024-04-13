import { CellKeyDownArgs, CellKeyboardEvent, Column, DataGridHandle } from 'react-data-grid';
import { useMemo, useRef } from 'react';
import { ArrayPath, FieldArray, FieldValues, useFieldArray, useFormContext } from 'react-hook-form';
import { v4 } from 'uuid';

interface TRowFields {
  itemId: string;
}

export interface UseDataGridKeyCellKeyDownParams<T extends FieldValues, TRow = unknown> {
  itemsFieldName: ArrayPath<T>,
  columns: Column<TRow>[],
  getNewRow?: () =>  FieldArray<FieldValues, ArrayPath<T>>;
}


/**
 * Handles the keydown event of the DataGrid
 * ここには、Datagridのkeydownイベントを処理する関数が入っている。
 * 
 */
export function useDataGridKeyCellKeyDown<T extends FieldValues, TRow extends TRowFields>({
  itemsFieldName,
  columns,
  getNewRow,
}: UseDataGridKeyCellKeyDownParams<T, TRow>) {

  const { setValue, control } = useFormContext();

  const {
    fields,  
    remove,
    insert,
  } = useFieldArray({
    name: itemsFieldName,
    control,
  });


  const dataGridRef = useRef<DataGridHandle>(null);
  
  const fieldsLength = fields.length;

  const {
    firstEditableColIdx,
  } = useMemo(() => {
    return {
      firstEditableColIdx: columns.findIndex((col) => col.editable),
      lastEditableColIdx: columns.reduceRight((acc, col, i) => (col.editable ? i : acc), -1),
    };
  }, [columns]);
 

  
  const handleCellKeyDown =  (
    args: CellKeyDownArgs<TRow>, 
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
    
    //const isLastRow = rowIdx === fieldsLength - 1;
    const isLastCellOfRow = idx === columns.length - 1;
    //const isLastRowAndCell = isLastRow && isLastCellOfRow;
    const isHeadRow = rowIdx === -1;
    
    const preventDefault = () => {
      event.preventDefault();
      event.preventGridDefault();
      event.stopPropagation();
    };

    const getEditableCellIdx = (direction: 'next' | 'prev') => {
      const start = direction === 'next' ? idx + 1 : idx - 1;
      const end = direction === 'next' ? columns.length : 0;
      const step = direction === 'next' ? 1 : -1;
    
      for (let i = start; direction === 'next' ? i < end : i > end; i += step) {
        if (columns[i]?.editable) {
          return i;
        }
      }
    
      return idx;
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

      if (shiftKey && key === 'Tab') {
        if (idx > firstEditableColIdx) {
          // 編集中のセルで、前のセルに移動する。
          selectCell({ rowIdx, idx: getEditableCellIdx('prev') }, true);

        } else if (idx <= firstEditableColIdx && rowIdx > 0 ) {
          // 行の最初のセルで、前の行の最後のセルに移動する。
          selectCell({ rowIdx: rowIdx - 1, idx: columns.length - 1 }, true);
        } 
        preventDefault();
      } else if ( key === 'Enter' || key === 'Tab') {
        // 編集中のセルで、次のセルに移動する。
        if (isLastCellOfRow) {
          selectCell({ rowIdx: rowIdx + 1, idx: firstEditableColIdx }, true);
        } else {
          selectCell({ rowIdx, idx: getEditableCellIdx('next') }, true);
        }
        preventDefault();
      }
      
      return;
    }


    
    /*************
     * 選択モード 
     ************/

    if (altKey && key === 'v') {
      // 選択中のセルで、行をコピーする。
      if (isHeadRow) return;
      insert(rowIdx, { ...row, itemId: v4() } as FieldArray<FieldValues, ArrayPath<T>>);
      preventDefault();
      return;
    }

    if (!shiftKey && key === 'Insert') {
      // 選択中のセルで、行を追加する。
      if (!getNewRow) return;
      insert(rowIdx + 1, getNewRow() );
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
        selectCell({ rowIdx: rowIdx + 1, idx: 0 }, true);
      }

      preventDefault();
      return;
    }
    
    if (key === 'ArrowLeft' && idx === 0) {
      // 左端のセルで、左キーを押した場合、前の行の右端のセルに移動する。
      if (rowIdx === 0) return;
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
      selectCell({ rowIdx, idx: firstEditableColIdx });
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
  };
}