import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDeleteContractById } from 'kokoas-client/src/hooksQuery';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';

/**
 * 削除出来るのは、未処理の契約書のみ
 */
export const DeleteButton = () => {
  const { getValues } = useFormContext<TypeOfForm>();
  const [open, setOpen] = useState(false);

  const { mutateAsync } = useDeleteContractById();
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    const contractId = getValues('contractId');
    await mutateAsync(contractId || '');
    navigate(`/${pages.projContractSearch}`);
  };

  return (
    <>
      <Button
        variant='outlined'
        color='error'
        onClick={() => setOpen(true)}
      >
        削除
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          まじで削除しますか？
        </DialogTitle>
        <DialogContent>
          <Alert
            severity='error'
            variant='standard'
          >
            削除したら、元に戻せません。
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
          >
            キャンセル
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={handleDelete}
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};