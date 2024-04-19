import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAtomValue } from 'jotai';
import { selectedItemsAtom } from '../OrderSelected';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { useConfirmDialog, useSnackBar } from 'kokoas-client/src/hooks';

export const DeleteRows = () => {
  const { setValue, getValues } = useTypedFormContext();
  const selectedItems = useAtomValue(selectedItemsAtom);
  const { setDialogState } = useConfirmDialog();
  const { setSnackState } = useSnackBar();
  
  const handleDelete = () => {
    const items = getValues('items');
    const newItems = items.filter((item) => !item.selected);

    setValue('items', newItems);
    setSnackState({
      open: true,
      severity: 'info',
      message: `${selectedItems.length}行削除しました。まだ保存されていません。\n削除を確定するには保存してください。`,
      autoHideDuration: 10000,
    });
  };

  

  return (
    <Button 
      variant={'contained'}
      color='info'
      startIcon={<DeleteIcon />}
      onClick={() => {
        setDialogState({
          open: true,
          title: `${selectedItems.length}行削除しますか？`,
          handleYes: handleDelete,
        });
      }}
      disabled={!selectedItems.length}
    >
      {'選択行削除'}
    </Button>
  );
};