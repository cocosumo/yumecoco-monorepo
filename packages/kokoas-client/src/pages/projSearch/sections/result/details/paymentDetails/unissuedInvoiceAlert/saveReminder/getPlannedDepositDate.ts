import format from 'date-fns/format';
import { KAlertPurpose } from '../alertConfig';

export const getPlannedDepositDate = ({
  purpose,
  paymentDate,
}: {
  purpose: KAlertPurpose
  paymentDate: Date | null
}) => {
  if (purpose !== 'subsidy' || !paymentDate) {
    return '';
  }

  return format(paymentDate, 'yyyy-MM-dd');

};
