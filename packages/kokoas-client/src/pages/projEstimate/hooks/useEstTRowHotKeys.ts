import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useHotkeys } from 'react-hotkeys-hook';
import { getItemsFieldName, TypeOfForm } from '../form';
import { UseManipulateItemRows } from './useManipulateItemRows';

const hotkeys = [
  'meta+i', // 行追加
  'meta+delete', // 行削除
  'meta+enter', // 次の行へ行く
  'meta+shift+i', // 行コピー
];


export const useEstTRowHotKeys = ({
  rowIdx,
  isLastRow,  
  handleRemoveItem,
  handleInsertItemBelow,
  handleCopyItemBelow,
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

  return useHotkeys<HTMLDivElement>(
    hotkeys,
    (e, handler) => {
      const { keys, meta, shift } = handler;

      if (keys?.includes('i') && meta && !shift) {
        handleInsertItemBelow(rowIdx);
      } else if (keys?.includes('i') && meta && shift) {
        handleCopyItemBelow(rowIdx); 
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
      preventDefault: true,
    },
    [gotoNextRow, handleRemoveItem, handleInsertItemBelow, handleCopyItemBelow],
  );
};