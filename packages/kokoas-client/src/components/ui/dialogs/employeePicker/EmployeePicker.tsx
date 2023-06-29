import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
} from '@mui/material';
import { IEmployees } from 'types';
import { EmpDialogContent } from './EmpDialogContent';
import { useState } from 'react';
import { useAllEmployees } from 'kokoas-client/src/hooksQuery';

export const EmployeePicker = ({
  open,
  initialEmpId = '',
  onClose,
  onChange,
}:{
  open: boolean,
  initialEmpId?: string,
  onClose: () => void
  onChange?: (selectedRecord: IEmployees | undefined, selectedEmpId: string) => void
}) => {
  const [selectedEmpId, setSelectedEmpId] = useState(initialEmpId);

  const { data } = useAllEmployees();


  const handleSelectEmpId = (empId: string) => {
    setSelectedEmpId((prev) => {
      if (prev === empId) return ''; // toggle
      return empId;
    });
  };




  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
    >
      <DialogTitle>
        社員選択
      </DialogTitle>
      <DialogContent 
        dividers
        sx={{
          p: 0,
          height: '300px',
        }}
      >
        <EmpDialogContent
          selectedEmpId={selectedEmpId}
          onSelectEmpId={handleSelectEmpId}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
        >
          キャンセル
        </Button>
        <Button
          variant='contained'
          disabled={!selectedEmpId || !data}
          onClick={() => {
            const selectedRecord = data
              ?.find((record) => record.uuid.value === selectedEmpId);
            onChange?.(selectedRecord, selectedEmpId);
            onClose();
          }}
        >
          選択
        </Button>
      </DialogActions>
    </Dialog>
  );
};