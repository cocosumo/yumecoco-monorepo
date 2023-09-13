import { getStoreNameById } from '../../api/getCachedStores';
import { getFormValues } from '../../api/getFormValues';
import './createHeaderTitle.css';
import DOMPurify from 'dompurify';

export const createHeaderTitle = (el: JQuery<HTMLElement>, storeId: string) => {
  const {
    month,
  } = getFormValues();

  const storeName = getStoreNameById(storeId);

  const sanitizedContent = DOMPurify.sanitize(`
    <h2 class="store_header_title">
      ここすも　${storeName}　${month}月契約一覧
    </h2>
  `);

  el.append(sanitizedContent);
  
};