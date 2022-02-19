import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useState, useReducer, useContext } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import AddCommentIcon from '@mui/icons-material/AddComment';

import {
  Stack,

} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import MemoForm from '../../forms/memo/MemoForm';

import initialMemoState from '../../../stores/memo';
import memoReducer from '../../../reducers/memo/memo';
import CustomerFormContext from '../../../context/CustomerFormContext';




export default function InputMemoDialog() {
  const [open, setOpen] = useState(false);

  const [formState, dispatch]  = useReducer(memoReducer, initialMemoState);

  const custFormContext = useContext(CustomerFormContext);
  const custFormState = custFormContext!.formState;


  const openDialogHandler = () => {
    const { groupId = '', customers } = custFormState;
    dispatch({ type: 'SET_INITIAL', payload: { groupId, custId: customers[0].custId ?? '', custName: customers[0].fullName.value  } });
    setOpen(true);
  };

  const closeDialogHandler = () => {
    setOpen(false);
  };


  const submitHandler = () => {
    console.log('submitted');
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={openDialogHandler} size="small" startIcon={<AddCommentIcon />}>
        メモを追加
      </Button>

        <Dialog open={open} onClose={closeDialogHandler} fullWidth>
          <DialogTitle>
            <Stack direction="row" justifyContent="space-between">
              メモを追加
              <IconButton color="primary" component="span" onClick={closeDialogHandler}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <MemoForm formState={formState} dispatch={dispatch} />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" onClick={submitHandler}>登録</Button>
          </DialogActions>
        </Dialog>
      </>
  );
}