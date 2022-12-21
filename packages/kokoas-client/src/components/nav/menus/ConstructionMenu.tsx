import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EngineeringIcon from '@mui/icons-material/Engineering';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import CarpenterIcon from '@mui/icons-material/Carpenter';

import TableChartIcon from '@mui/icons-material/TableChart';
import { pages } from '../../../pages/Router';
import { CollapsibleList } from './common/CollapsibleList';
import { LinkListItemButton } from './common/LinkListItemButton';

export const ConstructionMenu = () =>  {
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
      <CollapsibleList open={open}>
        <LinkListItemButton to={pages.projReg} icon={<CarpenterIcon />} text={'新規登録'} />
        <LinkListItemButton to={pages.projProspect} icon={<NoteAddIcon />} text={'見込み登録'} />
        <LinkListItemButton to={pages.projProspectSearch} icon={<TableChartIcon />} text={'見込み検索'} />
      </CollapsibleList>
    </>
  );
};