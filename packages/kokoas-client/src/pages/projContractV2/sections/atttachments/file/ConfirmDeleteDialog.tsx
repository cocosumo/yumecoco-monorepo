import { 
  Alert, 
  AlertTitle, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDeleteContractOtherFiles } from './useDeleteContractOtherFiles';
import { useCallback } from 'react';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
export const ConfirmDeleteDialog = ({
  open,
  onClose,
  fileName,
  fileKey,
}:{
  open: boolean,
  onClose: () => void,
  fileName: string,
  fileKey: string,
}) => {

  const { mutate } = useDeleteContractOtherFiles();
  const contractId = useTypedWatch({
    name: 'contractId',
  }) as string;

  const handleDelete = useCallback(() => {
    mutate({
      fileKey,
      contractId,
    });

    onClose();

  }, [
    fileKey,
    contractId,
    mutate,
    onClose,
  ]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        ファイルを削除しますか？
      </DialogTitle>
      <DialogContent
        sx={{
          // flex center
          display: 'flex',
          alignItems: 'center',
          direction: 'row',
        }}
      >
        <Alert
          severity='error'
        >
          <AlertTitle>
            {fileName}
          </AlertTitle>

          {'削除した場合、元に戻すことはできません。'}

        </Alert>

      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          onClick={onClose}
        >
          キャンセル
        </Button>
        <Button
          variant='contained'
          color='error'
          startIcon={<DeleteForeverIcon />}
          onClick={handleDelete}
        >
          削除
        </Button>
      </DialogActions>
    </Dialog>
  );
  
};