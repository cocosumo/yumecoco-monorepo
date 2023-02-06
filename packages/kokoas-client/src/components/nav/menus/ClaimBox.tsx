import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { ClaimBoxSubMenu } from './ClaimBoxSubMenu';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';


export default function ClaimBox() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <HomeRepairServiceIcon />
        </ListItemIcon>
        <ListItemText primary="クレームBOX" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <ClaimBoxSubMenu open={open} />
    </>
  );
}