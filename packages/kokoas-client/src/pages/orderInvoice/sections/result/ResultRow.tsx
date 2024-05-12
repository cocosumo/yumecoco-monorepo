import { useSetAtom } from 'jotai';
import { RowLayout } from './RowLayout';
import { invoiceDialogAtom } from 'kokoas-client/src/components/ui/dialogs/invoiceForm/InvoiceFormDialog';
import { ProgressStatusChip } from 'kokoas-client/src/components/ui/chips/ProgressStatusChip';
import { SearchResult } from '../../types';



export const ResultRow = (props: SearchResult) => {
  const setInvoiceDialogAtom = useSetAtom(invoiceDialogAtom);

  const { 
    invoiceId,
    orderId,
    projId,
    orderAmount, 
    paymentAmount,
    storeName,
    projName,
    invoiceStatus,
  } = props;

  const handleStatusClick = () => {
    if (!invoiceId) return;

    setInvoiceDialogAtom({ 
      open: true,
      invoiceId,
      projId,
      orderId,
      projName,
      storeName,
    });
  };

  return (
    <RowLayout 
      {...props}
      orderAmount={`${orderAmount?.toLocaleString()}円`}
      paymentAmount={`${paymentAmount?.toLocaleString()}円`}
      invoiceStatus={(
        <ProgressStatusChip 
          size={'small'}
          label={invoiceStatus}
          onClick={handleStatusClick}
        />
      )}
    />
  );
};