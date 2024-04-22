import { CircularProgress, DialogTitle } from '@mui/material';
import { SupplierName } from './SupplierName';
import { ProjectName } from './ProjectName';
import { useIsFetching } from '@tanstack/react-query';

export const InvoiceDialogTitle = () => {
  const isFetching = useIsFetching();

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
      {Boolean(isFetching) && (
        <CircularProgress size={16} />
      )}
    </DialogTitle>
  );
};