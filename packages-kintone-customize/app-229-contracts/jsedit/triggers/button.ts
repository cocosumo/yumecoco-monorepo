import { getPrintButton } from '../initialize/createToolbar/createPrintButton';

/**
 * プリントボタンを押したときのトリガーを追加する
 * @returns click => 印刷画面表示
 * */
export const addPrintButtonTrigger = () => getPrintButton()
  .on('click', () => {
    window.print();
  });