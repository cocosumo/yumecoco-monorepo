import { getContractsGroupedByStore } from '../api/getContractRecords';
import { getFormValues } from '../api/getFormValues';
import { getPrintArea } from '../initialize/createPrintArea';
import { getSelectStore } from '../initialize/createToolbar/createSelectStore';
import { createHightlightOptions } from './createHightlightOptions';
import { handleClickRow } from './store/createContractList/handleClickRow';
import { showResultByStore } from './store/showResultByStore';
import $ from 'jquery';
/**
 * 一覧の結果をリフレッシュして表示を更新する。
*/
export const refreshResult = async () => {
  // フォームから年、月、店舗を取得
  const {
    year,
    month,
    store,
  } = getFormValues();

  // ハイライトのオプションを作成
  createHightlightOptions(+year, +month);

  // 契約データを取得
  const result = await getContractsGroupedByStore({
    year,
    month,
    store,
  });
  
  // 表示エリアをクリア
  getPrintArea().empty();

  if (store) {
    // 店舗が選択されている場合はその店舗のみ表示する
    showResultByStore({
      records: result[store] || [],
      storeId: store,
    });
  } else {
    // 店舗の選択肢の順に全店舗を表示する
    getSelectStore().find('option')
      .each((_, option) => {

        const optVal = $(option).val() as string;
        if (!optVal) return;

        showResultByStore({
          records: result[optVal] || [],
          storeId: optVal,
        });

      });
  }
  
  handleClickRow();


};