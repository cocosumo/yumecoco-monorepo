import { Alert, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useLogicalDeleteCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../../hooks/useTypedHooks';

export const ConfirmDelete = ({
  handleClose,
}:{
  handleClose: () => void,
}) => {

  
  const custGroupId = useTypedWatch({
    name: 'custGroupId',
  }) as string;
  
  const {
    mutate,
  } = useLogicalDeleteCustGroupById();
  
  return (
    <>
      <DialogTitle>
        {'顧客を削除しますか？'}
      </DialogTitle>
      <DialogContent>
        <Alert severity='warning'>
          {'論理削除します。よろしいですか？'}
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
        >
          いいえ
        </Button>
        <Button
          color='error'
          variant='contained'
          onClick={() => {
            mutate({
              custGroupId,
              shouldDelete: true,
            });
            handleClose();
          }}
        >
          はい
        </Button>
      </DialogActions>
    
    </>
  );
};