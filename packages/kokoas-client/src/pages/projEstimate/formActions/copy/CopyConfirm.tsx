import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel } from '@mui/material';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useBackdrop, useSnackBar } from 'kokoas-client/src/hooks';
import { pages } from 'kokoas-client/src/pages/Router';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KForm } from '../../schema';

export const CopyConfirm = ({
  open,
  handleClose,
}:{
  open: boolean,
  handleClose: () => void,
}) => {

  const [checked, setChecked] = useState<boolean>(false);
  const { setSnackState } = useSnackBar();
  const { setBackdropState } = useBackdrop();  
  const navigate = useNavigate();

  
  const handleCopy = async () => {
    try {
      handleClose();
      setSnackState({
        open: true,
        autoHideDuration: 5000,
        message: 'コピーしました。工事を選択してください。',
        severity: 'success',
        handleClose: () => {
          setBackdropState({ open: false });
        },
      });


      const fieldToClear : KForm = 'estimateId'; 
      navigate(`${pages.projEstimate}?${generateParams({
        clearFields: checked ? fieldToClear : '0',
  
      })}`); 
       
    } catch (err) {
      setSnackState({
        open: true,
        message: err.message,
        severity: 'error',
      });
    }

  }; 

  return (
    <Dialog
      open={open}
      maxWidth={'xs'}
      onClose={handleClose}
    >
      <DialogTitle>
        見積もりのコピーを作成
      </DialogTitle>
      <DialogContent>
        <FormControlLabel 
          control={
            <Checkbox 
              checked={checked} 
              onChange={(_, newValue) => setChecked(newValue)}
            />
          } 
          label="同じ工事"
        />
      </DialogContent>
      <DialogActions>

        <Button
          onClick={handleClose}
        >
          いいえ
        </Button>
        <Button
          variant='contained'
          color='info'
          onClick={handleCopy}
        >
          はい
        </Button>

      </DialogActions>
    
    </Dialog>
  );
};