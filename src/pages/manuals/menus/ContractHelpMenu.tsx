import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

/**
 * 契約機能のヘルプ用メニューリスト
 * @returns 
 */
export default function ContractHelpMenu() {
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
        <ListItemText primary="契約" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={'project/contract/preview'}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ContentPasteSearchIcon />
              </ListItemIcon>
              <ListItemText primary="契約を確認する" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </>
  );
}
