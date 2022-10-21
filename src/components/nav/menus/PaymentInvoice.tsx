import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MoneyIcon from '@mui/icons-material/Money';
import { pages } from '../../../pages/Router';


export default function PaymentInvoice() {

  return (
    <Link to={pages.projPaymentInvoice}>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <MoneyIcon />
        </ListItemIcon>
        <ListItemText primary="入金情報入力" />
      </ListItemButton>
    </Link>
  );
}