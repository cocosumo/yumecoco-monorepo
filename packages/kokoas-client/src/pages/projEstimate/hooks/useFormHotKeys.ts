import { useFormContext } from 'react-hook-form';
import { useHotkeys } from 'react-hotkeys-hook';
import { TypeOfForm } from '../form';
import { useRowValues } from './useRowValues';
import { useConfirmDialog } from 'kokoas-client/src/hooks';

const preventedHotkeys = [
  'f7', // 標準はキャレットブラウズを有効化する
  'f10', // 標準はメニューバーを表示する
];
export const useFormHotKeys = ({
  enabled,
}:{
  enabled: boolean
}) => {
  const { setValue } = useFormContext<TypeOfForm>();
  const { setDialogState } = useConfirmDialog();
  const { getNewRow } = useRowValues();

  return useHotkeys<HTMLElement>(
    preventedHotkeys, 
    (_, handler)=>{
      if (!enabled) return;
      console.log(enabled);
      const { keys } = handler;
      if (keys?.includes('f10')) {
        setDialogState({
          open: true,
          content: 'クリアしますか？',
          title: '確認',
          withYes: true,
          withNo: true,
          handleYes: () => {
            setValue('items', [getNewRow()]);
          },
        });
       
      }
    }, 
    {
      preventDefault: true,
    }, 
    [enabled]);
};