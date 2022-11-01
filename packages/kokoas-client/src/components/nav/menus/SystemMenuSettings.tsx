import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { pages } from '../../../pages/Router';
import { Link } from 'react-router-dom';

//href={`https://rdmuhwtt6gx7.cybozu.com/k/admin/app/flow?app=${kintone.app.getId()}#section=settings`}

export const SystemMenuSettings = () => {
  return (
    <Link to={`${pages.settings}`}>
      <ListItemButton >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="設定" />
      </ListItemButton>
    </Link>
  );
};