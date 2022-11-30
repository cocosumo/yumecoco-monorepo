import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { AddressDialog } from './AddressDialog';
import { TypeOfForm } from './addressReducer';

export const SearchAddress = ({
  handleChange,
}: {
  handleChange: (param: TypeOfForm) => void
}) => {
  const [open, setOpen] = useState(false);

  const handleFinishSelection = (param: TypeOfForm) => {
    handleChange(param);
    setOpen(false);
  };

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
        handleChange={handleFinishSelection}
      />
    </>
  );
};