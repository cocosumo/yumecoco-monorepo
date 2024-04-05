import { Button } from '@mui/material';
import { OrderRequestDialog } from './OrderRequestDialog';
import { useState } from 'react';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { TForm } from '../../../schema';

export const OrderSelected = () => {
  const [open, setOpen] = useState(false);
  const [
    projId,
    projName,
    storeName,
  ] = useTypedWatch({ name: [
    'projId', 
    'projName',
    'storeName',
  ] }) as [
    TForm['projId'],
    TForm['projName'], 
    TForm['storeName'],
  ];

  const handleClose = () => {
    setOpen(false);
  };

  return (<>
    <Button 
      variant={'outlined'}
      color='primary'
      onClick={() => setOpen(true)}
      disabled={!projId}
    >
      発注書作成
    </Button>
    <OrderRequestDialog 
      open={open}
      handleClose={handleClose}
      storeName={storeName}
      projName={projName}
    />
  </>
    
  );
};