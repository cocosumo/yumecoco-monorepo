import { createSelect } from './createSelect';
import $ from 'jquery';


export const selectStoreId = 'selectStore';

export const createSelectStore = () => {
  const $select = createSelect(selectStoreId, '店舗');

  // side effect: save value to local storage
  $select.on('change', (e) => {
    const value = $(e.target).val() as string;
    localStorage.setItem(selectStoreId, value);
  });
};

export const getSelectStore = () => $(`#${selectStoreId}`);