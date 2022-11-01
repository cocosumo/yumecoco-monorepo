import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { pages } from '../../../pages/Router';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export const ContractSearch = () => {
  return (
    <Link to={pages.projContractSearch}>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon>
          <ManageSearchIcon />
        </ListItemIcon>
        <ListItemText primary="契約一覧" />
      </ListItemButton>
    </Link>
  );
};