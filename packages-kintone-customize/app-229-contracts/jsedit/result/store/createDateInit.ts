import moment from 'moment';
import './createDateInit.css';

export const createDateInit = ($el: JQuery<HTMLElement>) => {
  $el
    .append(`
    <div class="today_date">
      作成日：${moment().format('YYYY年MM月DD日')}
    </div>
  `);

};