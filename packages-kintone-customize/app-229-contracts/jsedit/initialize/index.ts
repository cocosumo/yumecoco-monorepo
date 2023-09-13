
import { createPrintArea } from './createPrintArea';
import createToolbar from './createToolbar';
import populateSelect from './populateSelect';


/**
 * 主なHTML要素を作成して初期化する
 * 
 */
export default async function () {

  // ツールバーを表示する
  createToolbar();
  
  // 印刷エリアを表示する
  createPrintArea();

  // select要素を初期化する
  await populateSelect();

}