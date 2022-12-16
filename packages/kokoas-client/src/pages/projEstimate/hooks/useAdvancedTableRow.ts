import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { FocusEventHandler, useCallback, useEffect, useState } from 'react';
import { TypeOfForm } from '../form';
import { v4 as uuidv4 }  from 'uuid';
import { useInitialRow } from './useInitialRow';
import { useIsLastRowModified } from './useIsLastRowModified';

export const useAdvancedTableRow = (rowIdx : number) => {
  const {
    setValues,
  } = useFormikContext<TypeOfForm>();

  const initialRow = useInitialRow();

  const {
    isLastRow,
    isLastRowModified,
  } = useIsLastRowModified(initialRow, rowIdx);

  useEffect(() => {
    if (isLastRowModified) {
      // 最終行は初期と異なる際、 行を自動追加する
      setValues(
        (prev) => produce(prev, (draft) => {
          draft.items.push({
            ...initialRow,
            key: uuidv4(),
          });

        }));
    }
  }, [isLastRowModified, setValues, initialRow, rowIdx]);

  const [focused, setFocused] = useState(false);

  const handleFocus : FocusEventHandler = useCallback(
    (e) => {
      //
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