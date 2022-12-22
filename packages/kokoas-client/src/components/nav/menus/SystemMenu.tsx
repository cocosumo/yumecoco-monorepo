import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

import { SystemMenuHelp } from './SystemMenuHelp';
import { SystemMenuSettings } from './SystemMenuSettings';
import { ListItemButton } from '@mui/material';


export default function SystemMenu() {

  return (
    <List>
      <SystemMenuHelp />

      <SystemMenuSettings />

      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="ログアウト" />
      </ListItemButton>

    </List>
  );
}
