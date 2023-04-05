import { useCallback, useEffect } from 'react';
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form';
import { getItemsFieldName, KRowFields, TypeOfForm } from '../form';
import { useRowValues } from './useRowValues';
import { useSnackBar } from 'kokoas-client/src/hooks';


export type UseManipulateItemRows =  ReturnType<typeof useManipulateItemRows>;

export const useManipulateItemRows = (
  props : UseFieldArrayReturn<TypeOfForm>,
  onAddDelete: () => void,
) => {
  const { setSnackState } = useSnackBar();
  const { setFocus, reset, getValues } = useFormContext<TypeOfForm>();

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
    const row = getValues(`items.${rowIdx}`);
    insert(rowIdx + 1, [{ ...row }]);
  }, [insert, getValues]);

  const handleRemoveItem = useCallback((rowIdx: number) => {
    const items = getValues('items');
    const rowsCount = items.length;
    const lastRowIdx = rowsCount - 1;
    const isLastRow = rowIdx === lastRowIdx;
    const isLastActiveRow = rowIdx === lastRowIdx - 1;
    const isFirstRow = rowIdx === 0;


    if (isLastRow) {
      setSnackState({
        open: true,
        message: '最後の行は削除出来ません',
        severity: 'warning',
        autoHideDuration: 10000,
      });
    } else {
 
      const focustToIdx = isLastActiveRow && !isFirstRow ? rowIdx - 1 : rowIdx + 1;
      const focusedInputElName = document.activeElement
        ?.getAttribute('name')
        ?.split('.')
        .at(-1) as KRowFields;
      // 同じ行の別のinputにフォーカスを移す
      setFocus(getItemsFieldName(focustToIdx, focusedInputElName ));
      remove(rowIdx);
    }
  }, [remove, setFocus, getValues, setSnackState]);


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

  const handleClearAll = useCallback(() => {
    reset();
  }, [reset]);

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
    handleClearAll,
  };
};