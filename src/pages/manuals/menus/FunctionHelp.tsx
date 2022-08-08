import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * 各機能のヘルプ
 * @returns 
 */
const FunctionHelp = () => {
  return (
    <>
      <List>
        <Link to='{pages.help}'>
          <ListItemButton>
            <ListItemIcon>
              {/* <InfoIcon /> */}
            </ListItemIcon>
            <ListItemText primary="顧客を登録する" />
          </ListItemButton>
        </Link>
      </List>
    </>
  );
};

export default FunctionHelp;