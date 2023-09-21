import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
//import NoteAddIcon from '@mui/icons-material/NoteAdd';

import TableChartIcon from '@mui/icons-material/TableChart';
import { pages } from '../../../pages/Router';
import { CollapsibleList } from './common/CollapsibleList';
import { LinkListItemButton } from './common/LinkListItemButton';
import { GiHumanTarget } from '@react-icons/all-files/gi/GiHumanTarget';

export const ProspectMenu = () =>  {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <GiHumanTarget fontSize={20} />
        </ListItemIcon>
        <ListItemText primary="見込管理" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={open}>
        {/*  <LinkListItemButton to={pages.projProspect} icon={<NoteAddIcon />} text={'見込登録'} /> */}
        <LinkListItemButton to={pages.projProspectSearch} icon={<TableChartIcon />} text={'見込一覧'} />
      </CollapsibleList>
    </>
  );
};