import { Button } from '@mui/material';
import { useMemo } from 'react';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { TForm } from '../../schema';
import { useSetAtom } from 'jotai';
import { TOrderItem } from '../../orderRequestForm/schema';
import { orderRequestAtom } from '../../orderRequestForm/OrderRequestDialog';


export const OrderSelected = () => {
  const setOrderRequestAtom = useSetAtom(orderRequestAtom);
  const formValues  = useTypedWatch();

  const { 
    projId,
    projName,
    storeName,
    items,
  } = formValues as TForm;

  const selectedItems: TOrderItem[] = useMemo(() => {
    return items.filter(item => item.selected);
  }, [items]);


  return (
    <Button 
      variant={'outlined'}
      color='primary'
      onClick={() => {
        setOrderRequestAtom({
          open: true,
          projId,
          projName,
          storeName,
          selectedItems,
        });
      }}
      disabled={!formValues.projId || !selectedItems.length}
    >
      {`発注書作成（${selectedItems.length}件）`}
    </Button>
    
  );
};