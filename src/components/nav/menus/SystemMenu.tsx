import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import { SystemMenuHelp } from './SystemMenuHelp';
import { SystemMenuSettings } from './SystemMenuSettings';


export default function SystemMenu() {

  return (
    <List>
      <SystemMenuHelp />

      <SystemMenuSettings />

      <ListItem button>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="ログアウト" />
      </ListItem>

    </List>
  );
}
