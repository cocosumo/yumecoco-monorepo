import { useCallback } from 'react';
import { UseFieldArrayReturn } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { useRowValues } from './useRowValues';

export const useManipulateItemRows = (
  props : UseFieldArrayReturn<TypeOfForm>,
) => {

  const {
    insert,
    remove,
    append,
    move,
    fields,
  } = props;

  const {
    getNewRow,
  } = useRowValues();

  const handleInsertItemBelow = useCallback((rowIdx: number) => {
    insert(rowIdx + 1, getNewRow());
  }, [insert, getNewRow]);

  const handleCopyItemBelow = useCallback((rowIdx: number) => {
    const { id: _, ...newRow } = fields[rowIdx];
    insert(rowIdx + 1, [newRow]);
  }, [insert, fields]);

  const handleRemoveItem = useCallback((rowIdx: number) => {
    remove(rowIdx);
  }, [remove]);

  const handleAppendItem = useCallback(() =>{
    append(getNewRow());
  }, [append, getNewRow]);

  const handleMoveRowUp = useCallback((rowIdx: number) => move(rowIdx, rowIdx - 1), [move]);

  const handleMoveRowDown = useCallback((rowIdx: number) => move(rowIdx, rowIdx + 1), [move]);

  const handleMoveAnywhere = (
    rowIdx: number,
    selectedRowIdx: number,
  ) => {
    move(rowIdx, selectedRowIdx);
  };

  return {
    handleInsertItemBelow,
    handleCopyItemBelow,
    handleRemoveItem,
    handleAppendItem,
    handleMoveRowUp,
    handleMoveRowDown,
    handleMoveAnywhere,
  };
};