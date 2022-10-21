import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PaymentInvoice from './PaymentInvoice';
import PaymentSearch from './PaymentSearch';
import PaymentInput from './PaymentInput';



export default function PaymentMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CurrencyYenIcon />
        </ListItemIcon>
        <ListItemText primary="入金管理" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <PaymentInvoice />
          <PaymentSearch />
          <PaymentInput />
        </List>
      </Collapse>
    </>
  );
}