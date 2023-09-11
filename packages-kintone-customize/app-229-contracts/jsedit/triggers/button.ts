import { getPrintButton } from '../initialize/toolbar/createPrintButton';

/**
 * プリントボタンを押したときのトリガーを追加する
 * */
export const addPrintButtonTrigger = () => getPrintButton().on('click', window.print);