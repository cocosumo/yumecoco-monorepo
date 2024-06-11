import { Button } from '@mui/material';
import { useDeleteOrder } from './useDeleteOrder';

export const DeleteButton = () => {

  const { handleConfirmDeleteOrder } = useDeleteOrder();

  return (
    <Button
      variant="contained"
      color="error"
      onClick={handleConfirmDeleteOrder}
    >
      削除
    </Button>
  );
};