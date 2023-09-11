import { getAllStores } from 'api-kintone';
import { createSelect } from './createSelect';
import $ from 'jquery';


export const selectStoreId = 'selectStore';

export const createSelectStore = async () => {
  const $selectStore = createSelect(selectStoreId, '店舗');

  const stores = await getAllStores();

  $selectStore.append(`
    <option value="">全店舗</option>
  `);

  stores.forEach((store) => {
    $selectStore.append(`
      <option value="${store.uuid.value}">${store.storeNameShort.value}</option>
    `);
  });

};

export const getSelectStore = () => $(`#${selectStoreId}`);