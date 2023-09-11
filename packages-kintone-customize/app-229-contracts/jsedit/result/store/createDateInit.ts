import moment from 'moment';

export const createDateInit = ($el: JQuery<HTMLElement>) => {
  $el
    .append(`
    <div id="todayDate">
      作成日：${moment().format('YYYY年MM月DD日')}
    </div>
  `);

};