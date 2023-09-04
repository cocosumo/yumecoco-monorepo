import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import { useDeleteContractById } from 'kokoas-client/src/hooksQuery';
import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../Router';
import DeleteIcon from '@mui/icons-material/Delete';

/**
 * 削除出来るのは、未処理の契約書のみ
 */
export const DeleteButton = () => {
  const [open, setOpen] = useState(false);

  const [contractId, envelopeStatus] = useWatch<TypeOfForm>({
    name: ['contractId', 'envelopeStatus'],
  });

  const canDelete = !envelopeStatus && !!contractId;

  const { mutateAsync } = useDeleteContractById();
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    await mutateAsync(contractId as string);
    navigate(`/${pages.projContractSearch}`);
  };

  return (
    <>
      <Tooltip
        title={'未処理の契約書のみ削除出来ます。'}
      >
        <div>
          <Button
            variant='outlined'
            color='error'
            onClick={() => setOpen(true)}
            disabled={!canDelete}
            startIcon={<DeleteIcon />}
            size='small'
          >
            削除
          </Button>
        </div>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          本当に削除しますか？
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
            startIcon={<DeleteIcon />}
          >
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};