import { getCachedStores } from '../../api/getCachedStores';
import { getSelectStore } from '../createToolbar/createSelectStore';

export const populateSelectStore = async () => {
  const stores = await getCachedStores();
  const $selectStore = getSelectStore();
  $selectStore.append(`
    <option value="">全店舗</option>
  `);

  stores.forEach((store) => {
    $selectStore.append(`
      <option value="${store.uuid.value}">${store.storeNameShort.value}</option>
    `);
  });

  // default is value from localStorage
  $selectStore.val(localStorage.getItem($selectStore.attr('id') as string) as string);
};