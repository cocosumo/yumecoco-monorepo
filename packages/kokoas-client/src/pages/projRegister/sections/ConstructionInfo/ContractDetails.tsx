import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useContractsByProjId } from 'kokoas-client/src/hooksQuery/useContractsByProjId';
import { ConstractList } from './ConstractList';

export interface ContractDetailsProps {
  open: boolean;
  onClose: (value?: string) => void;
  projId: string
}


export const ContractDetails = (props: ContractDetailsProps) => {
  const { onClose, open, projId, ...other } = props;

  const handleClose = () => {
    onClose();
  };

  const { data } = useContractsByProjId(projId);

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      onClose={() => onClose()}
      {...other}
    >
      <DialogTitle>
        {'契約済み見積もり情報'}
      </DialogTitle>
      <DialogContent>
        <ConstractList data={data?.records} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};