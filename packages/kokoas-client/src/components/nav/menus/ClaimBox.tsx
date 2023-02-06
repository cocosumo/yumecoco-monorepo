import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { EstimateSubMenu } from './EstimateSubMenu';


export default function ClaimBox() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <PermIdentityIcon />
        </ListItemIcon>
        <ListItemText primary="クレーム" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <EstimateSubMenu open={open} />
    </>
  );
}