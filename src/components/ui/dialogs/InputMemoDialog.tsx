import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useEffect } from 'react';
import DialogTitle from '@mui/material/DialogTitle';

import {
  Chip,
  Stack, Typography,

} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import MemoForm from '../../forms/memo/MemoForm';

import useSubmitState from '../../../hooks/useSubmitState';
import FormSnack from '../snacks/FormSnack';
import { addMemo } from '../../../api/kintone/memo/POST';
import ConfirmationDialog from './ConfirmationDialog';
import { FieldActionType, MemoFormState } from '../../../types/form.memo';
import { updateMemo } from '../../../api/kintone/memo/PUT';
import { ConvertedMemo, convertMemo } from '../../../reducers/memo/actions/helpers/converters';

type Answer = 'ok' | 'cancel' | '';

interface ConfirmState {
  open: boolean,
  answer?: Answer
}

interface InputMemoDialogProps {
  state: {
    formState: MemoFormState,
    dispatch: (action: FieldActionType)=>void
    memoOpen: boolean,
    setMemoOpen: (prev: boolean) => void
  }
}

export default function InputMemoDialog(props : InputMemoDialogProps) {
  const { memoOpen, formState, setMemoOpen, dispatch } = props.state;
  const [confirmState, setConfirmState] = useState<ConfirmState>({ open: false, answer: '' });
  const [convertedMemo, setConvertedMemo] = useState<ConvertedMemo>({
    recordId: { value:  formState.groupId },
    memoType: { value: formState.memoType.value },
    contents: { value: formState.memoContents.value },

  });

  useEffect(()=>{
    if (formState.submitState === 'VALIDATE_SUCCESS') {
      convertMemo(formState).then(resp => {
        console.log(resp, 'RESP');
        setConvertedMemo(resp);
      });
    }
  }, [formState.submitState]);

  const addMemoFn = () => addMemo(convertedMemo);
  const updateMemoFn = () => updateMemo({ ...convertedMemo, $id: { type: '__ID__', value: formState.$id ?? '' } });

  const { snackState, handleClose } = useSubmitState({
    formState,
    dispatch,
    saveToDb: () => !!formState.$id ? updateMemoFn() : addMemoFn(),
  });


  useEffect(()=>{
    switch (formState.submitState) {
      case 'VALIDATE_SUCCESS':
        setConfirmState({ open: true });
        break;
      case 'SUCCESS':
        setMemoOpen(false);
        break;
    }
  }, [formState.submitState]);

  useEffect(()=>{
    if (!confirmState.open && confirmState.answer === 'ok') {
      dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'CONFIRM_SAVE' } });
    } else {
      dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'EDITTING' } });
    }
  }, [confirmState.open]);


  const handleMemoClose = () =>  setMemoOpen(false);
  const handleConfirmClose = (answer: Answer) => setConfirmState({ open: false, answer });
  const handleSubmit = () =>  {
    dispatch({ type: 'CHANGE_SUBMITSTATE', payload: { submitState: 'VALIDATE' } });
  };

  return (
    <>

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

          <Typography whiteSpace={'break-spaces'} variant="body1">{formState.memoContents.value}</Typography>
        </Stack>
      </ConfirmationDialog>
    </>
  );
}