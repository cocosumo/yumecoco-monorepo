import { Button, Dialog, DialogActions, DialogContent, DialogTitle, RadioGroup } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { ListEstimate } from './ListEstimate';


export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
  options: Estimates.main.SavedData[]
}


export const ConfirmationDialogRaw = (props: ConfirmationDialogRawProps) => {
  const { onClose, value: valueProp, open, options, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const radioGroupRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  /**
   * 選択肢の生成
   */
  const actualOptions: OptionNode[] = options.map<OptionNode>((rec) => {
    const { $id } = rec;
    return {
      value: $id.value,
      key: $id.value,
      component: (
        <ListEstimate
          estimateRecord={rec}
        />),
    };
  });

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>
        Phone Ringtone
      </DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="ringtone"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {actualOptions}

          
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};