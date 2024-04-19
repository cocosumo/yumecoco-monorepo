import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { TForm } from '../../schema';
import { atom, useAtom, useSetAtom } from 'jotai';
import { TOrderItem } from '../../orderRequestForm/schema';
import { orderRequestAtom } from '../../orderRequestForm/OrderRequestDialog';

export const selectedItemsAtom = atom<TOrderItem[]>([]);

export const OrderSelected = () => {
  const setOrderRequestAtom = useSetAtom(orderRequestAtom);
  const [selectedItems, setSelectedItems] = useAtom(selectedItemsAtom);
  const formValues  = useTypedWatch();

  const { 
    projId,
    projName,
    storeName,
    items,
  } = formValues as TForm;

  useEffect(() => {
    setSelectedItems(items.filter(item => item.selected));
  }, [items, setSelectedItems]);


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