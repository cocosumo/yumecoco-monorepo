import { fetchRecords } from '../api/fetchRecords';

export default function quotePulldown(target: string) {
  let val: string[] = [];
  if (target === 'tax') {
    val = Array.of('課税', '非課税');
  } else if (target === 'majorItem') {
    /* kintoneから大項目を取得する */
    const majorItemList = fetchRecords('majourItems');
    // console.log('majorItemList', majorItemList);

    /* 大項目の配列をvalに格納する */

    val = Array.of('大項目1', '大項目2', '大項目3', '大項目4');
  } else if (target === 'middleItem') {
    /* 要編集 */
    val = Array.of('中項目1', '中項目2', '中項目3', '中項目4', '中項目5', '中項目6');
  } else {
    val = ['あり', 'なし'];
  }

  return val;
}