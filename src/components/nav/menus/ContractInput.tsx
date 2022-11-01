import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { pages } from '../../../pages/Router';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

export const ContractInput = () => {
  return (
    <Link to={pages.projContractPreview}>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <LocalPrintshopIcon />
        </ListItemIcon>
        <ListItemText primary="契約を印刷" />
      </ListItemButton>
    </Link>
  );
};