import { Dialog, DialogTitle  } from '@mui/material';
import { Confirmation } from './Confirmation';
import { useState } from 'react';
import { SearchProject } from './SearchProject';

export const SelectAndpadProject = ({
  open,
  onClose,
}:{
  open: boolean,
  onClose: () => void
  onSelectSystemId?: (systemId: string) => void
}) => {

  const [stepIndex, setStepIndex] = useState(0);

  const handleNext = () => setStepIndex((prev) => prev + 1);

  return (
    <Dialog 
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Andpadとの強制接続
      </DialogTitle>
      {stepIndex === 0 && (<Confirmation onClose={onClose} handleNext={handleNext} />)}
      {stepIndex === 1 && (<SearchProject />)}
    </Dialog>
  );
};