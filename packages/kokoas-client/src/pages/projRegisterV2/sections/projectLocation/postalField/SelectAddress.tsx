import { Button, Tooltip } from '@mui/material';
import { AddressDialog, AddressDialogProps } from 'kokoas-client/src/components';
import { useState } from 'react';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';

export const SelectAddress = () => {
  const { setValue } = useTypedFormContext();
  const [open, setOpen] = useState(false);
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange: AddressDialogProps['handleChange'] = (result) => {
    const {
      postalCode,
      prefecture,
      city,
      town,

    } = result;
    
    setValue('postal', postalCode);
    setValue('address1', `${prefecture}${city}${town}`);
    
    handleClose();
  };

  return (
    <>
      <Tooltip title="住所の各項目を選択する">
        <Button
          variant='outlined'
          onClick={() => setOpen(true)}
        >
          住所を選択
        </Button>
      </Tooltip>
      <AddressDialog 
        open={open}
        handleChange={handleChange}
        handleClose={handleClose}
      />
    
    </>
  );
};