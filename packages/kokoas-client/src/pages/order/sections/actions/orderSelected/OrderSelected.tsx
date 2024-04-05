import { Button } from '@mui/material';
import { OrderRequestDialog } from './OrderRequestDialog';
import { useMemo, useState } from 'react';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { TForm } from '../../../schema';
import { TOrderItem } from './schema';

export const OrderSelected = () => {
  const [open, setOpen] = useState(false);
  const formValues  = useTypedWatch();

  const { 
    projId,
    projName,
    storeName,
    items,
  } = formValues as TForm;

  const handleClose = () => {
    setOpen(false);
  };

  const selectedItems: TOrderItem[] = useMemo(() => {
    if (!open) return [];
    return items.filter(item => item.selected);
  }, [open, items]);

  return (<>
    <Button 
      variant={'outlined'}
      color='primary'
      onClick={() => setOpen(true)}
      disabled={!formValues.projId}
    >
      発注書作成
    </Button>
    <OrderRequestDialog 
      open={open}
      handleClose={handleClose}
      projId={projId}
      projName={projName}
      storeName={storeName}
      selectedItems={selectedItems}
    />
  </>
    
  );
};