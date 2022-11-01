import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { generateParams } from '../../../helpers/url';
import { pages } from '../../../pages/Router';
import HelpIcon from '@mui/icons-material/Help';

export const SystemMenuHelp = () => {
  return (
    <Link to={`${pages.help}?${generateParams({
      menuOpen: 0,
    })}`} target="_blank" rel="noopener noreferrer"
    >
      <ListItemButton>
        <ListItemIcon>
          <HelpIcon />
        </ListItemIcon>
        <ListItemText primary="ヘルプ" />
      </ListItemButton>
    </Link>
  );
};