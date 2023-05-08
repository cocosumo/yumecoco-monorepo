import { ListItemText, MenuItem  } from '@mui/material';

import { VoidContractDialog } from './VoidContractDialog';
import { useState } from 'react';



export const MenuVoidContract = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MenuItem onClick={() => {
        setOpen(true);
      }}
      >
        <ListItemText>
          取り下げ
        </ListItemText>
      </MenuItem>
      <VoidContractDialog 
        handleClose={()=> setOpen(false)} 
        open={open}
      />
    </>
  );
};