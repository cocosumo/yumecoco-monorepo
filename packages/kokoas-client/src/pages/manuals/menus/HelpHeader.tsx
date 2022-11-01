import { IconButton, ListItemText } from '@mui/material';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const HelpHeader = () => {
  return (    
    <IconButton /* onClick={handleDrawerClose} */>
      <HelpCenterIcon />
      <ListItemText primary="ココアス ヘルプページ" />
    </IconButton>
  );
};

export default HelpHeader;