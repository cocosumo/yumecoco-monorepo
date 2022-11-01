import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

export default function  CostomerHelpMenu() {
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
        <ListItemText primary="顧客" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="custgroup/register">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <AppRegistrationIcon />
              </ListItemIcon>
              <ListItemText primary="新規登録" />
            </ListItemButton>
          </Link>
          <Link to="customer/search">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PersonSearchIcon />
              </ListItemIcon>
              <ListItemText primary="顧客検索" />
            </ListItemButton>
          </Link>
          <Link to="custgroup/edit">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PersonSearchIcon />
              </ListItemIcon>
              <ListItemText primary="顧客情報の編集" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </>
  );
}
