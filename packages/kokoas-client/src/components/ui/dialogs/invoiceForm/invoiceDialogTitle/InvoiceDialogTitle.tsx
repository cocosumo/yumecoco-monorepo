import { CircularProgress, DialogTitle } from '@mui/material';
import { SupplierName } from './SupplierName';
import { ProjectName } from './ProjectName';
import { useIsFetching } from '@tanstack/react-query';
import { OrderDataId } from './OrderDataId';
import { InvoiceStatus } from './InvoiceStatus';

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
      <OrderDataId />
      <InvoiceStatus />
      {Boolean(isFetching) && (
        <CircularProgress size={16} />
      )}
    </DialogTitle>
  );
};