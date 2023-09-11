import $ from 'jquery';

export const addTriggers = () => {

  $('.table_contracts_list tbody tr').off()
    .on('click', function () {
      console.log('triggered');

    });
  
};