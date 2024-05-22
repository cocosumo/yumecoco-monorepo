import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PaymentInput from './PaymentInput';
import Invoice from './Invoice';
import { CollapsibleList } from './common/CollapsibleList';
import InvoiceSearch from './InvoiceSearch';



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
        <ListItemText primary="入金情報" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={open}>
        <Invoice />
        <InvoiceSearch />
        <PaymentInput />
      </CollapsibleList>
    </>
  );
}