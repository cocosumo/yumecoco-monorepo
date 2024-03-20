import format from 'date-fns/format';
import { KAlertPurpose } from '../alertConfig';

export const getPlannedDepositDate = ({
  purpose,
  paymentDate,
}: {
  purpose: KAlertPurpose
  paymentDate: Date | null
}) => {
  if (purpose !== 'subsidy') {
    return '';
  } else {
    if (!paymentDate) return '';

    return format(paymentDate, 'yyyy-MM-dd');
  }
};
