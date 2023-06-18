import { CellKeyDownArgs, CellKeyboardEvent, DataGridHandle } from 'react-data-grid';
import { RowItem, getColumns } from './columns';
import { useRef } from 'react';
import { useFieldArray } from 'react-hook-form';
import { TForm } from '../schema';

export const useDataGridKeyCellKeyDown = (columns: ReturnType<typeof getColumns>) => {
  const { fields } = useFieldArray<TForm>({
    name: 'items',
  });
  const dataGridRef = useRef<DataGridHandle>(null);

  const fieldsLength = fields.length;

  function handleCellKeyDown(
    args: CellKeyDownArgs<RowItem>, 
    event: CellKeyboardEvent,

  ) {
    
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
      if (key === 'Enter') {
        selectCell({ rowIdx: args.rowIdx, idx: idx + 1 });
        preventDefault();
      }
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

  return {
    handleCellKeyDown, 
    dataGridRef,
  };
};