import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import HelpIcon from '@mui/icons-material/Help';

export const SystemMenuHelp = () => {
  return (
    <ListItemButton onClick={() => {
      window.open('https://rdmuhwtt6gx7.cybozu.com/k/212/', '_blank', 'noopener,noreferrer');
    }}
    >
      <ListItemIcon>
        <HelpIcon />
      </ListItemIcon>
      <ListItemText primary="ヘルプ" />
    </ListItemButton>

  );
};