import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CollapsibleList } from './common/CollapsibleList';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { OrderInput } from './OrderInput';
import { OrderInvoiceSearch } from './OrderInvoiceSearch';

export default function OrderMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="発注情報" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <CollapsibleList open={open}>
        <OrderInput />
        <OrderInvoiceSearch />
      </CollapsibleList>
    </>
  );
}