import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { FocusEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { initialValues, TypeOfForm } from '../form';
import { v4 as uuidv4 }  from 'uuid';

export const useAdvancedTableRow = (rowIdx : number) => {
  const {
    values,
    setValues,
  } = useFormikContext<TypeOfForm>();

  const { items, projTypeProfit } = values;

  const initialRow = useMemo(() => {
    return {
      ...initialValues.items[0],
      elemProfRate: projTypeProfit,
    };
  }, [projTypeProfit]);

  const isLastRow = rowIdx === items.length - 1;

  const isModified = useMemo(() => {

    //  頭に _ あるものは、比較に無視。
    const { key: _k1, elemProfRate: _ep1, ...clonedInitialRow } = initialRow;
    const { key: _k2, elemProfRate: _ep2, ...clonedRow } = items[rowIdx];

    // 速度が必要になったら、改善
    return JSON.stringify(clonedInitialRow) !== JSON.stringify(clonedRow);
  }, [items, rowIdx, initialRow]);


  useEffect(() => {
    if (isModified && isLastRow) {
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

      const currentTarget = e.currentTarget;
      requestAnimationFrame(() => {
        setFocused(currentTarget.contains(document.activeElement));

      });
    }, [],
  );

  return {
    focused,
    handleFocus,
    isModified,
  };
};