import { getPrintButton } from '../initialize/createToolbar/createPrintButton';

/**
 * プリントボタンを押したときのトリガーを追加する
 * */
export const addPrintButtonTrigger = () => getPrintButton()
  .on('click', window.print);