import { RecordKey } from './config';
import { getAllUnissuedInvoiceAlerts } from './getAllUnissuedInvoiceAlerts';

const statusKey: RecordKey = 'alertState';

export const getActiveUnissuedInvoiceAlerts = async () => {
  return getAllUnissuedInvoiceAlerts({
    condition: `${statusKey} != "0"`,
  });
};  
