import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TableChartIcon from '@mui/icons-material/TableChart';

export default function ConstructionHelpMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <EngineeringIcon />
        </ListItemIcon>
        <ListItemText primary="工事情報" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="project/register">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <CarpenterIcon />
              </ListItemIcon>
              <ListItemText primary="新規登録" />
            </ListItemButton>
          </Link>
          <Link to="project/prospect/register">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <NoteAddIcon />
              </ListItemIcon>
              <ListItemText primary="見込み登録" />
            </ListItemButton>
          </Link>
          <Link to="project/prospect/search">
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>
              <ListItemText primary="見込み検索" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </>
  );
}