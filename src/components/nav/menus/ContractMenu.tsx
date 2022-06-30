import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import { Link } from 'react-router-dom';
import { pages } from '../../../pages/Router';

export default function ContractMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <HistoryEduIcon />
        </ListItemIcon>
        <ListItemText primary="契約申請書" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to={pages.projContractPreview}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ContentPasteSearchIcon />
              </ListItemIcon>
              <ListItemText primary="契約確認" />
            </ListItemButton>
          </Link>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <CancelScheduleSendIcon />
            </ListItemIcon>
            <ListItemText primary="申請取り下げ" />
          </ListItemButton>
        </List>
      </Collapse>
    </>
  );
}