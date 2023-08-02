import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CarpenterIcon from '@mui/icons-material/Carpenter';

import { pages } from '../../../pages/Router';
import { CollapsibleList } from './common/CollapsibleList';
import { LinkListItemButton } from './common/LinkListItemButton';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';

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
        <LinkListItemButton to={pages.projEditV2} icon={<CarpenterIcon />} text={'新規登録'}
          indented
        />
        <LinkListItemButton to={pages.projProspectSearch} icon={<TroubleshootIcon />} text={'見込一覧・検索'}
          indented
        />

      </CollapsibleList>
    </>
  );
};