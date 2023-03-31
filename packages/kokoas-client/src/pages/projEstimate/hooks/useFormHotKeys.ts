
import { useHotkeys } from 'react-hotkeys-hook';

const preventedHotkeys = [
  'meta+f7', // 標準はキャレットブラウズを有効化する
  'meta+f10', // 標準はメニューバーを表示する
];
export const useFormHotKeys = ({
  enabled,
}:{
  enabled: boolean
}) => {

  return useHotkeys<HTMLElement>(
    preventedHotkeys, 
    ()=>{
      if (!enabled) return;
    }, 
    {
      preventDefault: true,
    }, 
    [enabled]);
};