import moment from 'moment';
import $ from 'jquery';

export const createDateInit = () => {
  $('#root')
    .append(`
    <div id="todayDate">
      作成日：${moment().format('YYYY年MM月DD日')}
    </div>
  `);

};