import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { pages } from '../../Router';
import HelpIcon from '@mui/icons-material/Help';

/**
 * ココアスとは(説明)
 * @returns 
 */
const AboutKokoas = ()=> {
  return (
    <List>
      <Link to={pages.help}>
        <ListItemButton>
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="ヘルプ" />
        </ListItemButton>
      </Link>
    </List>
  );
};

export default AboutKokoas;