import { useCallback, useEffect, useMemo } from 'react';
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../form';
import { useRowValues } from './useRowValues';


export type UseManipulateItemRows =  ReturnType<typeof useManipulateItemRows>;

export const useManipulateItemRows = (
  props : UseFieldArrayReturn<TypeOfForm>,
  onAddDelete: () => void,
) => {

  const { setFocus } = useFormContext<TypeOfForm>();

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

  const rowsCount = useMemo(() => fields.length, [fields]);

  const handleInsertItemBelow = useCallback((rowIdx: number) => {
    insert(rowIdx + 1, getNewRow());
  }, [insert, getNewRow]);

  const handleCopyItemBelow = useCallback((rowIdx: number) => {
    const { id: _, ...newRow } = fields[rowIdx];
    insert(rowIdx + 1, [newRow]);
  }, [insert, fields]);

  const handleRemoveItem = useCallback((rowIdx: number) => {
    remove(rowIdx);

    if (rowIdx > 0) {
      setFocus(getItemsFieldName(rowIdx - 1, 'majorItem'));
    }
  }, [remove, setFocus]);

  const handleAppendItem = useCallback(() =>{
    append(getNewRow(), { shouldFocus: false });
  }, [append, getNewRow]);

  const handleMoveRowUp = useCallback((rowIdx: number) => move(rowIdx, rowIdx - 1), [move]);

  const handleMoveRowDown = useCallback((rowIdx: number) => move(rowIdx, rowIdx + 1), [move]);

  const handleMoveAnywhere = (
    rowIdx: number,
    selectedRowIdx: number,
  ) => {
    move(rowIdx, selectedRowIdx);
  };

  /* 追加・削除の際、渡されたonAddDeleteを発火する */
  useEffect(() => {
    if (fields.length) {
      onAddDelete();
    }
  }, [onAddDelete, fields.length]);

  return {
    ...props,
    handleInsertItemBelow,
    handleCopyItemBelow,
    handleRemoveItem,
    handleAppendItem,
    handleMoveRowUp,
    handleMoveRowDown,
    handleMoveAnywhere,
    rowsCount,

  };
};