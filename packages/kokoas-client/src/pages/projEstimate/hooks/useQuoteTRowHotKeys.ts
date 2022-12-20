import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { debounce } from 'lodash';
import { useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { TypeOfForm } from '../form';
import { useInitialRow } from './useInitialRow';


export const useQuoteTRowHotKeys = (rowIdx: number) => {
  const { setValues } = useFormikContext<TypeOfForm>();
  const {
    getNewRow,
  } = useInitialRow();

  const insertRow = useMemo(
    () => debounce(
      () => setValues(prev => produce(prev, ({ items }) => {
        items.splice(rowIdx + 1, 0, getNewRow());
      })),
      50,
    ),
    [getNewRow, rowIdx, setValues],
  );

  return useHotkeys<HTMLTableRowElement>('insert',
    insertRow,
    {
      enableOnFormTags: ['INPUT', 'textarea'],
    },
  );
};