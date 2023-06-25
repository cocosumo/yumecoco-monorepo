import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
} from '@mui/material';
import { IEmployees } from 'types';
import { EmpDialogContent } from './EmpDialogContent';

export const EmployeePicker = ({
  open,
  onClose,
}:{
  open: boolean,
  onClose: () => void
  onChange?: (selectedRecord: IEmployees | undefined) => void
}) => {


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>
        社員選択
      </DialogTitle>
      <DialogContent 
        dividers
        sx={{
          p: 0,
          height: '300px',
        }}
      >
        <EmpDialogContent />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
        >
          キャンセル
        </Button>
        <Button
          variant='contained'
        >
          選択
        </Button>
      </DialogActions>
    </Dialog>
  );
};