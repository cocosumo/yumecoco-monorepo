import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useHotkeys } from 'react-hotkeys-hook';
import { getItemsFieldName, TypeOfForm } from '../form';
import { EstRowFormatProps } from '../tables/estimatesVirtual/EstRowFormat';
import { UseManipulateItemRows } from './useManipulateItemRows';

const hotkeys = [
  'insert', // 行追加
  'meta+delete', // 行削除
  'meta+enter', // 次の行へ行く
];


export const useEstTRowHotKeys = ({
  rowIdx,
  isLastRow,
  handleRemoveItem,
  handleInsertItemBelow,
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
    (_, handler) => {
      const { keys } = handler;
      if (keys?.includes('insert')) {
        handleInsertItemBelow(rowIdx);
      } else if (keys?.includes('delete')) {
        handleRemoveItem(rowIdx);
      } else if (keys?.includes('enter')) {
        gotoNextRow();
      }
    },
    {
      enableOnFormTags: ['INPUT', 'textarea'],
      keyup: false,
      keydown: true,
    },
    [gotoNextRow, handleRemoveItem, handleInsertItemBelow],
  );
};