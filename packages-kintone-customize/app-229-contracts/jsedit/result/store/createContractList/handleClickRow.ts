import { getRecordPath } from 'api-kintone';
import $ from 'jquery';
import { appId } from '../../../../src/constants';
/**
 * 一覧の行をクリックすると詳細ページを開く
*/
export const handleClickRow = () => {
  $('.table_contracts_list tbody tr').off()
    .on('click', (event) => {

      const $row = $(event.target) // td
        .closest('tr');

      const kintonePath = getRecordPath({
        recordId: $row.data('id'),
        appId: String(appId),

      });

      window.open(kintonePath, '_blank');

    });
  
};