import { populateSelectMonth } from './populateSelectMonth';
import { populateSelectStore } from './populateSelectStore';
import { populateSelectYear } from './populateSelectYear';

/**
 * Populate static select elements
 * 各選択肢の初期設定
 */
export default async function () {

  await populateSelectStore();
  
  populateSelectMonth();
  populateSelectYear();
  
}