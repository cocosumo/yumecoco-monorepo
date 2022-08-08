import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import AboutKokoas from './menus/AboutKokoas';

export default function ManualMenus() {
  return (
    <div>
      <Divider />
      <List>
        <AboutKokoas />
      </List>
      <Divider />
    </div>
  );
}