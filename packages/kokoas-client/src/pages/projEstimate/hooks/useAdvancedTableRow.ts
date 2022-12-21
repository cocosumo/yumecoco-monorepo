import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { FocusEventHandler, useCallback, useEffect, useState } from 'react';
import { TypeOfForm } from '../form';
import { useInitialRow } from './useInitialRow';
import { useIsLastRowModified } from './useIsLastRowModified';


/**
 * 自動行追加
 */
export const useAdvancedTableRow = (rowIdx : number) => {
  const {
    setValues,
    values,
  } = useFormikContext<TypeOfForm>();
  const { envStatus } = values;
  const [focused, setFocused] = useState(false);

  const isWithContract = !!envStatus;
  const {
    initialRow,
    getNewRow,
  } = useInitialRow();

  const {
    isLastRow,
    isLastRowModified,
  } = useIsLastRowModified(initialRow, rowIdx);

  useEffect(() => {
    if (
      isLastRowModified
      && !isWithContract // 契約がある時、行追加しない
    ) {
      // 最終行は初期と異なる際、 行を自動追加する
      setValues(
        (prev) => produce(prev, (draft) => {
          draft.items.push(getNewRow());
        }));
    }
  }, [isLastRowModified, rowIdx, isWithContract, setValues, getNewRow]);



  const handleFocus : FocusEventHandler = useCallback(
    (e) => {
      if (!isLastRow) return;

      const currentTarget = e.currentTarget;
      requestAnimationFrame(() => {
        setFocused(currentTarget.contains(document.activeElement));
      });
    }, [isLastRow],
  );

  return {
    focused,
    isLastRowModified,
    handleFocus,
  };
};