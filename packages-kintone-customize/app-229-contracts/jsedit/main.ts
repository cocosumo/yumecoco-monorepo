import initialize from './initialize';
import { refreshResult } from './result/refreshResult';
import { addPrintButtonTrigger } from './triggers/button';
import { addResultRefreshTriggers, addWeekHighlightTriggers } from './triggers/select';
import './main.css';
import { removeElements } from './initialize/removeElements';

/** 紹介料一覧 */
const commissionRates = 6343111; 

/** 紹介料一覧（開発用） */
const commissionRatesDev = 6343125; 

(()=> {
  kintone.events.on('app.record.index.show', async  (event)=>{

    const {
      viewId,
    } = event;
    
    if (viewId === commissionRates || viewId === commissionRatesDev) {

      // 初期化
      await initialize();

      // イベントの登録
      addResultRefreshTriggers();
      addWeekHighlightTriggers();
      addPrintButtonTrigger();

      // 結果を表示する
      refreshResult();

      // Kintone不要な要素を削除する
      removeElements();
    }
    
    
  });

})();