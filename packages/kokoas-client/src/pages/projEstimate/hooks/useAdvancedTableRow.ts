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

  const isModified = useMemo(() => {
    return JSON.stringify(initialRow) !== JSON.stringify(items[rowIdx]);
  }, [items, rowIdx]);

  useEffect(() => {
    if (isModified) {
      setValues(prev => produce(prev, draft => {
        draft.items.push({
          ...initialRow,
          key: uuidv4(),
        });
      }));
    }
  }, [isModified, setValues, initialRow]);

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