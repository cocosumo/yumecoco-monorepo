import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { pages } from '../../../pages/Router';
import CalculateIcon from '@mui/icons-material/Calculate';
import { generateParams } from '../../../helpers/url';

export const EstimateSubMenuRegister = () => {
  return (
    <Link to={`${pages.projEstimate}?${generateParams({ menuOpen: +false })}`} target="_blank" rel="noopener noreferrer" >
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemIcon > 
          <CalculateIcon />
        </ListItemIcon>
        <ListItemText primary="見積もり登録" />
      </ListItemButton>
    </Link>
  );
};