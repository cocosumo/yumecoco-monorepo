import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { FocusEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { TypeOfForm } from '../form';
import { v4 as uuidv4 }  from 'uuid';
import { useInitialRow } from './useInitialRow';

export const useAdvancedTableRow = (rowIdx : number) => {
  const {
    values,
    setValues,
  } = useFormikContext<TypeOfForm>();

  const { items } = values;

  const initialRow = useInitialRow();

  const isLastRow = rowIdx === items.length - 1;

  const isModified = useMemo(() => {
    //  頭に 「_」 あるものは、比較に無視。
    const { key: _k1, elemProfRate: _ep1, ...clonedInitialRow } = initialRow;
    const { key: _k2, elemProfRate: _ep2, ...clonedRow } = items[rowIdx];

    // 短いですが、速度が必要になったら、改善
    return JSON.stringify(clonedInitialRow) !== JSON.stringify(clonedRow);
  }, [items, rowIdx, initialRow]);


  useEffect(() => {
    if (isModified && isLastRow) {
      // 最終行は初期と異なる際、 行を自動追加する
      setValues(
        (prev) => produce(prev, (draft) => {
          draft.items.push({
            ...initialRow,
            key: uuidv4(),
          });

        }));
    }
  }, [isModified, setValues, initialRow, rowIdx, isLastRow]);

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
    isModified,
    handleFocus,
  };
};