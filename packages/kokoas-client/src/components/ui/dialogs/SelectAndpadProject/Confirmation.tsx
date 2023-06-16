import { Alert, Button, DialogActions, DialogContent, Stack, Typography } from '@mui/material';

export const Confirmation = ({
  onClose,
  handleNext,
}:{
  onClose: () => void,
  handleNext?: () => void
}) => {
  return (
    <>
      <DialogContent>
        <Stack spacing={2}>
          <Typography>
            Andpadとココアスの顧客情報を紐づけることが出来ます。紐づけしますか。
          </Typography>
          <Alert severity='warning'>
            紐づけを行うと、ココアスからANDPADへの情報更新が出来なくなります。
          </Alert>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          キャンセル
        </Button>
        <Button
          onClick={handleNext} 
          variant='contained'
        >
          はい
        </Button>
      </DialogActions>
    </>
  );
};