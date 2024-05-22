import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { pages } from '../../../pages/Router';
import { LinkListItemButton } from './common/LinkListItemButton';


export default function InvoiceSearch() {

  return (
    <LinkListItemButton to={pages.projInvoiceSearch} icon={<ManageSearchIcon />} text={'請求一覧'} 
      indented
    />

  );
}