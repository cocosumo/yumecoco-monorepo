import { getStoreNameById } from '../../api/getCachedStores';
import { getFormValues } from '../../api/getFormValues';


export const addHeaderTitle = (el: JQuery<HTMLElement>) => {
  const {
    month,
    store,
  } = getFormValues();

  const storeName = getStoreNameById(store);

  el.append(`
    <h2 class="store_header_title">
      ここすも　${storeName}　${month}月契約一覧
    </h2>
  `);
  
};