
import { pages } from '../../../pages/Router';
import { LinkListItemButton } from './common/LinkListItemButton';
import ReceiptIcon from '@mui/icons-material/Receipt';


export const OrderInvoiceSearch = () => {
  return (
    <LinkListItemButton 
      to={pages.projOrderInvoiceSearch}
      icon={<ReceiptIcon />} 
      text={'請求一覧'}
      indented
    />
  );
};