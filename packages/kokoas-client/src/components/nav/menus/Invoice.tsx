
import MoneyIcon from '@mui/icons-material/Money';
import { pages } from '../../../pages/Router';
import { LinkListItemButton } from './common/LinkListItemButton';


export default function Invoice() {

  return (
    <LinkListItemButton to={pages.projInvoiceV2} icon={<MoneyIcon />} text={'請求入力'}
      indented
    />
  );
}