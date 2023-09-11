
import { toolbarInit } from './toolbar/toolbarInit';
import { createDateInit } from './createDateInit';


/**
 * 主なHTML要素を作成して初期化する
 * 
 */
export default function () {

  // ツールバーを表示する
  toolbarInit();

  // 作成日を表示する
  createDateInit();

  // メインテーブルを表示する
  //resultTableInit();

}