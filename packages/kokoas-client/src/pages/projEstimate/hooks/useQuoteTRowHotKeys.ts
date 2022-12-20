import { useFormikContext } from 'formik';
import { produce } from 'immer';
import debounce from 'lodash/debounce';
import { useCallback, useMemo } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { TypeOfForm } from '../form';
import { useInitialRow } from './useInitialRow';

const hotkeys = [
  'insert', // 行追加
  'meta+delete', // 行削除
  'meta+enter', // 次の行へ行く
];


export const useQuoteTRowHotKeys = (rowIdx: number) => {
  const {
    setValues,
    values: { items },
  } = useFormikContext<TypeOfForm>();

  const isLastRow = rowIdx === items.length - 1;

  const {
    getNewRow,
  } = useInitialRow();

  /** 行追加  debouncing subsequent calls.*/
  const insertRow = useMemo(
    () => debounce(
      () => setValues(prev => produce(prev, (draft) => {
        draft.items.splice(rowIdx + 1, 0, getNewRow());
      })),
      200,
      {
        'leading': true,
        'trailing': false,
      },
    ),
    [getNewRow, rowIdx, setValues],
  );

  /**　行削除  */
  const deleteRow = useMemo(
    () => debounce(
      () => {
        if (!isLastRow) {
          setValues(prev => produce(prev, (draft) => {
            draft.items.splice(rowIdx, 1);
          }));
        }
      },
      200,
    ),
    [ rowIdx, setValues, isLastRow],
  );

  const gotoNextRow = useCallback(() => {

    if (!isLastRow) {
      const nextRowId = items[rowIdx + 1].key;
      (document
        // td# でも可能ですが、エスケープが必要になるので、セレクターは以下の形にしました。
        .querySelector(`tr[id='${nextRowId}'] input`) as HTMLInputElement)
        .focus();
    }
  }, [items, rowIdx, isLastRow]);

  return useHotkeys<HTMLTableRowElement>(
    hotkeys,
    (_, handler) => {
      const { keys } = handler;
      if (keys?.includes('insert')) {
        insertRow();
      } else if (keys?.includes('delete')) {
        deleteRow();
      } else if (keys?.includes('enter')) {
        gotoNextRow();
      }
    },
    {
      enableOnFormTags: ['INPUT', 'textarea'],
      keyup: false,
      keydown: true,
    },
    [insertRow, deleteRow, gotoNextRow],
  );
};