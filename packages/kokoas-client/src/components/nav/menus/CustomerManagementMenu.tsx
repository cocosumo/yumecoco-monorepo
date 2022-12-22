import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UpdateIcon from '@mui/icons-material/Update';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { CollapsibleList } from './common/CollapsibleList';
import { LinkListItemButton } from './common/LinkListItemButton';


export default function CustomerManagementMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="顧客管理" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={open}>
        <LinkListItemButton icon={<AccountBalanceIcon />} text={'資金計画作成'} />
        <LinkListItemButton icon={<CurrencyYenIcon />} text={'見積作成書'} />
        <LinkListItemButton icon={<UpdateIcon />} text={'見込管理'} />
      </CollapsibleList>
    </>
  );
}