
import { createPrintArea } from './createPrintArea';
import createToolbar from './createToolbar';


/**
 * 主なHTML要素を作成して初期化する
 * 
 */
export default async function () {

  // ツールバーを表示する
  await createToolbar();
  
  // 印刷エリアを表示する
  createPrintArea();


}