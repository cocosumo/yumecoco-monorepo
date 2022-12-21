import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { pages } from '../../../pages/Router';
import { LinkListItemButton } from './common/LinkListItemButton';


export default function PaymentSearch() {

  return (
    <LinkListItemButton to={pages.projPaymentSearch} icon={<ManageSearchIcon />} text={'入金予定一覧'} />

  );
}