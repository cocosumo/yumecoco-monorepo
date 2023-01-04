import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateParams } from '../../../../../helpers/url';
import { pages } from '../../../../Router';
import { EstimatesDialogContent } from './EstimatesDialogContent';

export interface ConfirmationDialogRawProps {
  name: string;
  open: boolean;
  onClose: (value?: string) => void;
  projId: string
}


export const ConfirmationDialogRaw = (props: ConfirmationDialogRawProps) => {
  const { name, onClose, open, projId, ...other } = props;
  const [value, setValue] = useState('');
  const navigate = useNavigate();


  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    navigate(`${pages.projEstimate}?${generateParams({ projEstimateId: value })}`);
    onClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };


  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      onClose={() => onClose()}
      {...other}
    >
      <DialogTitle>
        {'編集する見積もりを選択してください'}
      </DialogTitle>
      <EstimatesDialogContent
        name={name}
        onChange={handleChange}
        projId={projId}
        value={value}
      />
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          キャンセル
        </Button>
        <Button onClick={handleOk}>
          選択
        </Button>
      </DialogActions>
    </Dialog>
  );
};