import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { pages } from '../../../pages/Router';


export default function PaymentInput() {

  return (
    <Link to={pages.projPaymentInput}>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <FactCheckIcon />
        </ListItemIcon>
        <ListItemText primary="入金情報入力" />
      </ListItemButton>
    </Link>
  );
}