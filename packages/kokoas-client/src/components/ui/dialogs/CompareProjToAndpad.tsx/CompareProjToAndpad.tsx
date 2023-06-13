import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';

export const CompareProjToAndpad = ({
  open,
  onClose,
}:{
  open: boolean,
  onClose: () => void
  onSelectSystemId?: (systemId: string) => void
}) => {

  return (
    <Dialog 
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Andpadとの強制接続
      </DialogTitle>
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
        <Button variant='contained'>
          はい
        </Button>
      </DialogActions>
    </Dialog>
  );
};