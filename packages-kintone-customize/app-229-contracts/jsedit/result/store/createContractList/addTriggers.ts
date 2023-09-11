import { getRecordPath } from 'api-kintone';
import $ from 'jquery';
import { appId } from '../../../../src/constants';

export const addTriggers = () => {

  $('.table_contracts_list tbody tr').off()
    .on('click', function () {


      const kintonePath = getRecordPath({
        recordId: $(this).data('id'),
        appId: String(appId),

      });

      window.open(kintonePath, '_blank');

    });
  
};