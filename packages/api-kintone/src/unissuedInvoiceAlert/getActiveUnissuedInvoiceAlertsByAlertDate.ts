import format from 'date-fns/format';
import { RecordKey } from './config';
import { getAllUnissuedInvoiceAlerts } from './getAllUnissuedInvoiceAlerts';

const statusKey: RecordKey = 'alertState';
const alertDateKey: RecordKey = 'scheduledAlertDate';

export const getActiveUnissuedInvoiceAlertsByAlertDate = async (date: Date) => {
  const dateStr = format(date, 'yyyy-MM-dd');

  const condition = [
    `${statusKey} != "0"`,
    `${alertDateKey} <= "${dateStr}"`,
  ].join(' and ');

  return getAllUnissuedInvoiceAlerts({
    condition: condition,
  });
};  
