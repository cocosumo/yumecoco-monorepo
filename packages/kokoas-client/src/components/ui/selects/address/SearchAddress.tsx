import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { AddressDialog } from './AddressDialog';

export const SearchAddress = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    
      <Button 
        variant='contained' 
        color={'secondary'}
        onClick={() => setOpen(true)}
        startIcon={(
          <Typography fontSize={'20'} fontWeight={'bold'}>
            〒
          </Typography>
          )}
      >
        住所検索
      </Button>
      <AddressDialog 
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};