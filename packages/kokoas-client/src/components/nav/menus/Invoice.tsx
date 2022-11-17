import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MoneyIcon from '@mui/icons-material/Money';
import { pages } from '../../../pages/Router';


export default function Invoice() {

  return (
    <Link to={pages.projInvoice}>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <MoneyIcon />
        </ListItemIcon>
        <ListItemText primary="請求入力" />
      </ListItemButton>
    </Link>
  );
}