import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { pages } from '../../../pages/Router';


export default function PaymentSearch() {

  return (
    <Link to={pages.projPaymentSearch}>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <ManageSearchIcon />
        </ListItemIcon>
        <ListItemText primary="入金予定一覧" />
      </ListItemButton>
    </Link>
  );
}