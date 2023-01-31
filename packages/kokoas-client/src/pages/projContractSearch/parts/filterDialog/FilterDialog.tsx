import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { AmountRange } from './AmountRange';


export const FilterDialog = ({
  open,
  handleClose,
}: {
  open: boolean,
  handleClose: () => void
}) => {



  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        絞り込み
      </DialogTitle>
      <DialogContent >
        <Stack spacing={2} mt={4}>
          {/*  <FormikTextFieldV2 label={'工事名'} name={getFieldName('projName')} />
          <AmountRange />
          <ContractDateRange /> */}
          <AmountRange />

        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant={'text'} onClick={handleClose}>
          閉じる
        </Button>
        <Button variant={'contained'}>
          検索
        </Button>
      </DialogActions>
    </Dialog>
  );
};