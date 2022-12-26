
import { useCallback } from 'react';
import { useRowValues } from './useRowValues';
import { UseFieldArrayReturn } from 'react-hook-form';
import { TypeOfForm } from '../form';

export const useManipulateItems = (
  props : UseFieldArrayReturn<TypeOfForm> & {
    rowIdx: number,
  },
) => {

  const {
    insert,
    remove,
    rowIdx,
    fields,
  } = props;

  const {
    getNewRow,
  } = useRowValues();

  const handleInsertItemBelow = useCallback(() => {
    insert(rowIdx + 1, getNewRow());
  }, [insert, rowIdx, getNewRow]);

  const handleCopyItemBelow = () => {
    const { id: _, ...newRow } = fields[rowIdx];
    insert(rowIdx + 1, [newRow]);
  };

  const handleRemoveItem = useCallback(() => {
    remove(rowIdx);
  }, [remove, rowIdx]);

  return {
    handleInsertItemBelow,
    handleCopyItemBelow,
    handleRemoveItem,
  };
};