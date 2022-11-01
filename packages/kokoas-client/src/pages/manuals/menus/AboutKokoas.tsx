import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
// import { pages } from '../../Router';
import InfoIcon from '@mui/icons-material/Info';

/**
 * ココアスとは(説明)
 * @returns 
 */
const AboutKokoas = ()=> {
  return (
    <List>
      <Link to='{pages.help}'>
        <ListItemButton>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="ココアスとは" />
        </ListItemButton>
      </Link>
    </List>
  );
};

export default AboutKokoas;