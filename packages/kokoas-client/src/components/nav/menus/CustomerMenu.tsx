import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { CollapsibleList } from './common/CollapsibleList';
import { LinkListItemButton } from './common/LinkListItemButton';
import { pages } from 'kokoas-client/src/pages/Router';


export default function CustomerMenu() {
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
        <ListItemText primary="顧客情報" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={open}>
        <LinkListItemButton 
          to={pages.custGroupEditV2} icon={<AppRegistrationIcon />} 
          text={'新規登録'}
          indented
        />
        <LinkListItemButton 
          to={pages.projSearch} 
          icon={<PersonSearchIcon />} text={'一覧・検索'}
          indented
        />
      </CollapsibleList>
    </>
  );
}