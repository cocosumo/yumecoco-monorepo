import { Dialog, DialogTitle, DialogContent, DialogActions, Button,
  ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Stack,

} from '@mui/material';
import { useFormikContext } from 'formik';
import { useContext } from 'react';
import { MemoFormType } from '../form';
import { MemoContext } from '../MemoContext';
import { saveMemo } from './../api/saveMemo';
import { format, parseISO } from 'date-fns';
import { MemoIcon } from './MemoIcon';
import { MemoType } from '../MemoForm';



export const ConfirmSave = () => {
  const {
    resetForm,
    setSubmitting,
    values,
  } = useFormikContext<MemoFormType>();

  const {
    handleClose: handleCloseMainForm,
    confirmSaveOpen,
    handleConfirmSaveOpen,
  } = useContext(MemoContext)!;

  const {
    memoType,
    contents,
    commenter,
    createDate,
  } = values;



  const handleSave = () => {
    saveMemo(values)
      .then(resp => {
        console.log(resp);
        console.log('RESET!!!', values, resp);
        resetForm();
        setSubmitting(false);
        handleCloseMainForm('submitted');
      })
      .catch((err)=>{
        console.error('Save failed.', err);
      });
  };


  return (
    <Dialog
        open={confirmSaveOpen}
        onClose={()=> handleConfirmSaveOpen(false)}
        maxWidth={'md'}
      >
      <DialogTitle>
        この内容で登録しますか。
      </DialogTitle>
      <DialogContent>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar src="#" ><MemoIcon type={memoType as MemoType} /></Avatar>
          </ListItemAvatar>
          <ListItemText
          primary={
            <Stack direction={'row'} justifyContent="space-between">
              <span>
                {memoType}<br/>
                <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                  {commenter}
                </Typography>

              </span>
            </Stack>
            }
          secondary={
            <Stack component={'span'}>
              {contents} <br />
              {format((createDate ? parseISO(createDate) :  new Date()), 'yyyy年MM月dd日')}
            </Stack>
          }
        />
        </ListItem>

      </DialogContent>
      <DialogActions
        // sx={{ justifyContent: 'center' }} To center the buttons
      >
        <Button onClick={handleSave} variant="outlined">はい</Button>
        <Button onClick={()=> handleConfirmSaveOpen(false)} variant="outlined" color={'error'}>いいえ</Button>
      </DialogActions>
    </Dialog>
  );
};