import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { Form, useFormikContext } from 'formik';
import { ReactNode } from 'react';
import { ConfirmSave } from './parts/ConfirmSave';

export const MemoFormContainer = ({
  children,
  memoOpen,
  handleClose,
  confirmSaveOpen,
}: {
  children: ReactNode
  memoOpen: boolean
  handleClose: (reason: string) => void,
  confirmSaveOpen: boolean
}) => {
  const { submitForm } = useFormikContext();

  return (
    <Form noValidate >

      <Dialog
        open={memoOpen}
        onClose={(_, reason)=> handleClose(reason)}
        maxWidth={'md'}
      >
        <DialogTitle>
          メモを追加
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} pt={2} minWidth={360}>
            {children}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={submitForm} variant="outlined">
            保存
          </Button>
        </DialogActions>

        {confirmSaveOpen && <ConfirmSave />}
      </Dialog>
    </Form>
  );
};