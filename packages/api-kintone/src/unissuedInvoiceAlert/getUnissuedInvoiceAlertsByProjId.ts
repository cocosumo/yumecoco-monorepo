import { RecordKey } from './config';
import { getAllUnissuedInvoiceAlerts } from './getAllUnissuedInvoiceAlerts';

const projIdKey: RecordKey = 'projId';

export const getUnissuedInvoiceAlertsByProjId = async (projId: string) => {
  return getAllUnissuedInvoiceAlerts({
    condition: `${projIdKey} = "${projId}"`,
  });
};  
