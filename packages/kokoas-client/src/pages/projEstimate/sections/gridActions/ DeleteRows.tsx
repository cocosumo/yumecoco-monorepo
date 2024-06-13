import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useConfirmDialog, useSnackBar } from 'kokoas-client/src/hooks';
import { useTypedFormContext } from '../../hooks';
import { useWatch } from 'react-hook-form';
import { useMemo } from 'react';

export const DeleteRows = () => {
  const { setValue, control } = useTypedFormContext();
  const items = useWatch({
    control,
    name: 'items',
  });
  const { setDialogState } = useConfirmDialog();
  const { setSnackState } = useSnackBar();

  const selectedItems = useMemo(() => {
    return items.filter((item) => !item.selected);

  }, [items]);
  
  const handleDelete = () => {
    const newItems = items.filter((item) => !item.selected);

    setValue('items', newItems);
    setSnackState({
      open: true,
      severity: 'info',
      message: `${newItems.length}行削除しました。まだ保存されていません。\n削除を確定するには保存してください。`,
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