import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { useEffect, useRef } from 'react';
import { JADatePicker } from '../../../../components/ui/datetimepickers/JADatePicker';

export const FilterDialog = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}) => {
  const projNameRef = useRef<HTMLInputElement>();


  return (
    <Dialog
      open={true}
      onClose={handleClose}
    >
      <DialogTitle>
        絞り込み
      </DialogTitle>
      <DialogContent>
        <Stack pt={2}>
          <TextField
            label={'工事名'}
            inputRef={projNameRef}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant={'text'} onClick={handleClose}>
          閉じる
        </Button>
        <Button variant={'outlined'}>
          検索
        </Button>
      </DialogActions>
    </Dialog>
  );
};