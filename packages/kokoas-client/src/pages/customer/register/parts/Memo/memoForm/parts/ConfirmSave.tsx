import { Dialog, DialogTitle, DialogContent, DialogActions, Button,
  ListItem, ListItemText, Typography, Stack,

} from '@mui/material';
import { useFormikContext } from 'formik';
import { useContext } from 'react';
import { MemoFormType } from '../form';
import { MemoContext } from '../MemoContext';
import { formDataToKintone } from '../api/formDataToKintone';
import { format, parseISO } from 'date-fns';
import { saveMemo } from 'api-kintone';
import { MemoAvatar } from '../../MemoAvatar';



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



  const handleSave = async () => {

    const memoRecord = await formDataToKintone(values);

    await saveMemo({
      id: values.memoId,
      record: memoRecord,
    });
    
    resetForm();
    setSubmitting(false);
    handleCloseMainForm('submitted');

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
          <MemoAvatar memoType={memoType} />

          <ListItemText
            primary={
              <Stack direction={'row'} justifyContent="space-between">
                <span>
                  {memoType}
                  <br />
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
                {contents}
                {' '}
                <br />
                {format((createDate ? parseISO(createDate) :  new Date()), 'yyyy年MM月dd日')}
              </Stack>
          }
          />
        </ListItem>

      </DialogContent>
      <DialogActions >
        <Button onClick={handleSave} variant="outlined">
          はい
        </Button>
        <Button onClick={()=> handleConfirmSaveOpen(false)} variant="outlined" color={'error'}>
          いいえ
        </Button>
      </DialogActions>
    </Dialog>
  );
};