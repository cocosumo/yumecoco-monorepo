import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useEffect, useReducer, useContext } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import AddCommentIcon from '@mui/icons-material/AddComment';

import {
  Chip,
  Stack, Typography,

} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import MemoForm from '../../forms/memo/MemoForm';

import initialMemoState from '../../../stores/memo';
import memoReducer from '../../../reducers/memo/memo';
import CustomerFormContext from '../../../context/CustomerFormContext';
import useSubmitState from '../../../hooks/useSubmitState';
import FormSnack from '../snacks/FormSnack';
import { addMemo } from '../../../api/kintone/memo/POST';
import ConfirmationDialog from './ConfirmationDialog';

type Answer = 'ok' | 'cancel' | '';

interface ConfirmState {
  open: boolean,
  answer?: Answer
}

export default function InputMemoDialog() {
  const [memoOpen, setMemoOpen] = useState(false);
  const [confirmState, setConfirmState] = useState<ConfirmState>({ open: false, answer: '' });
  const [formState, dispatch]  = useReducer(memoReducer, initialMemoState);

  const { snackState, handleClose } = useSubmitState({
    formState,
    dispatch,
    saveToDb: () => addMemo({
      groupId: { value:  formState.groupId },
      memoType: { value: formState.memoType.value },
    }),
  });

  const custFormContext = useContext(CustomerFormContext);
  const custFormState = custFormContext!.formState;

  useEffect(()=>{
    if (formState.submitState === 'VALIDATE_SUCCESS'){
      setConfirmState({ open: true });
    }
  }, [formState.submitState]);

  useEffect(()=>{
    if (!confirmState.open && confirmState.answer === 'ok'){
      dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'CONFIRM_SAVE' } });
      setMemoOpen(false);
    } else {
      dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'EDITTING' } });
    }
  }, [confirmState.open]);


  const handleMemoOpen = () => {
    const { groupId = '', customers } = custFormState;
    dispatch({ type: 'SET_INITIAL', payload: { groupId, custId: customers[0].custId ?? '', custName: customers[0].fullName.value  } });
    setMemoOpen(true);
  };

  const handleMemoClose = () =>  setMemoOpen(false);
  const handleConfirmClose = (answer: Answer) => setConfirmState({ open: false, answer });
  const handleSubmit = () =>  {
    dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'VALIDATE' } });
  };


  return (
    <>
      <Button variant="contained" onClick={handleMemoOpen} size="small" startIcon={<AddCommentIcon />}>
        メモを追加
      </Button>

        <Dialog open={memoOpen} onClose={handleMemoClose} fullWidth>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between">
              メモを追加
              <IconButton color="primary" component="span" onClick={handleMemoClose}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <MemoForm formState={formState} dispatch={dispatch} />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleSubmit}>登録</Button>
          </DialogActions>
        </Dialog>
        <FormSnack
          snackState={snackState}
          handleClose={handleClose}
        />
        <ConfirmationDialog state={{ open: confirmState.open, handleConfirmClose }} >
          <Stack spacing={2}>
            <Chip sx={{ borderRadius: '5px' }} label={formState.memoType.value}/>

            <Typography variant="body1">{formState.memoContents.value}</Typography>
         </Stack>
        </ConfirmationDialog>
      </>
  );
}