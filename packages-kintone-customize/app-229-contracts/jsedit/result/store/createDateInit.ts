import moment from 'moment';
import './createDateInit.css';
/**
 * 作成日の生成
 * jquery
 * @returns div '作成日：YYYY年MM月DD日'
 */
export const createDateInit = ($el: JQuery<HTMLElement>) => {
  $el
    .append(`
    <div class="today_date">
      作成日：${moment().format('YYYY年MM月DD日')}
    </div>
  `);

};