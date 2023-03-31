import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useHotkeys } from 'react-hotkeys-hook';
import { getItemsFieldName, TypeOfForm } from '../form';
import { UseManipulateItemRows } from './useManipulateItemRows';

const hotkeys = [
  'meta+i', // 行追加
  'meta+delete', // 行削除
  'meta+enter', // 次の行へ行く
  'f7',
  'f10',
];


export const useEstTRowHotKeys = ({
  rowIdx,
  isLastRow,
  handleRemoveItem,
  handleInsertItemBelow,
  handleClearAll,
}: UseManipulateItemRows & {
  rowIdx: number
  isLastRow: boolean,
}) => {
  const {
    setFocus,
  } = useFormContext<TypeOfForm>();

  const gotoNextRow = useCallback(() => {
    if (!isLastRow) {
      setFocus(getItemsFieldName(rowIdx + 1, 'majorItem'));
    }
  }, [rowIdx, isLastRow, setFocus]);

  return useHotkeys<HTMLElement>(
    hotkeys,
    (e, handler) => {
      const { keys } = handler;

      if (keys?.includes('i') || keys?.includes('f7')) {
        handleInsertItemBelow(rowIdx);
      } else if (keys?.includes('delete')) {
        handleRemoveItem(rowIdx);
      } else if (keys?.includes('enter')) {
        gotoNextRow();
      } else if (keys?.includes('f10')) {
        handleClearAll();
      }
    },
    {
      enableOnFormTags: ['INPUT', 'textarea'],
      keyup: false,
      keydown: true,
      preventDefault: true,
    },
    [gotoNextRow, handleRemoveItem, handleInsertItemBelow],
  );
};