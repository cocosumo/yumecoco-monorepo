import { Button, Tooltip } from '@mui/material';
import { AddressDialog, AddressDialogProps } from 'kokoas-client/src/components';
import { useTypedFormContext } from 'kokoas-client/src/pages/custGroup/hooks/useTypedHooks';
import { useState } from 'react';

export const SelectAddress = ({
  index,
}:{
  index: number,
}) => {
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
    
    setValue(`customers.${index}.postal`, postalCode);
    setValue(`customers.${index}.address1`, `${prefecture}${city}${town}`);
    
    handleClose();
  };

  return (
    <>
      <Tooltip title="住所の各項目を選択する">
        <Button
          variant='outlined'
          size='small'
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