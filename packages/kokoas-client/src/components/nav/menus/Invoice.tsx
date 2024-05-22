
import MoneyIcon from '@mui/icons-material/Money';
import { pages } from '../../../pages/Router';
import { LinkListItemButton } from './common/LinkListItemButton';


export default function Invoice() {

  return (
    <LinkListItemButton to={pages.projInvoice} icon={<MoneyIcon />} text={'請求入力'}
      indented
    />
  );
}