import { getStoreNameById } from '../../api/getCachedStores';
import { getFormValues } from '../../api/getFormValues';
import './createHeaderTitle.css';

export const createHeaderTitle = (el: JQuery<HTMLElement>, storeId: string) => {
  const {
    month,
  } = getFormValues();

  const storeName = getStoreNameById(storeId);

  el.append(`
    <h2 class="store_header_title">
      ここすも　${storeName}　${month}月契約一覧
    </h2>
  `);
  
};