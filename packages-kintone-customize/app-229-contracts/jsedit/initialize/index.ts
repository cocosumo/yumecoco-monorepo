
import { toolbarInit } from './toolbar/toolbarInit';
import { createPrintArea } from './createPrintArea';


/**
 * 主なHTML要素を作成して初期化する
 * 
 */
export default async function () {

  // ツールバーを表示する
  await toolbarInit();

  // 作成日を表示する
  //createDateInit();

  // 印刷エリアを表示する
  createPrintArea();

  // メインテーブルを表示する
  //resultTableInit();

}