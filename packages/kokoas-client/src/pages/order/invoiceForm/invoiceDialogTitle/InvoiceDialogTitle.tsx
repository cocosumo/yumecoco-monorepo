import { DialogTitle } from '@mui/material';
import { SupplierName } from './SupplierName';
import { ProjectName } from './ProjectName';

export const InvoiceDialogTitle = () => {
  return (
    <DialogTitle
      sx={{
        display: 'flex', 
        direction: 'row',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <SupplierName /> 
      <ProjectName />
    </DialogTitle>
  );
};