import { RecordKey } from './config';
import { getAllUnissuedInvoiceAlerts } from './getAllUnissuedInvoiceAlerts';

const statusKey: RecordKey = 'alertState';
const projIdKey: RecordKey = 'projId';

export const getActiveUnissuedInvoiceAlertsByProjId = async (projId: string) => {

  const condition = [
    `${statusKey} != "0"`,
    `${projIdKey} = "${projId}"`,
  ].join(' and ');

  return getAllUnissuedInvoiceAlerts({
    condition: condition,
  });
};  
