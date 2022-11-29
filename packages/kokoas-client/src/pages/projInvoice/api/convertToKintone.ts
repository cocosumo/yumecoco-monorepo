import { IInvoices } from 'types';
import { TypeOfForm } from '../form';

export const convertToKintone = ({
  custGroupId,
  billingAmount,
  amountType,
  estimates,
  exceedChecked,
  plannedPaymentDate,
}: TypeOfForm) => {


  /* formをkintoneの型に変換する */
  const kintoneRecord: Partial<IInvoices> = {
    projId: { value: custGroupId },
    amountType: { value: amountType },
    billingAmount: { value: billingAmount },
    plannedPaymentDate: { value: plannedPaymentDate },
    excessChecked: { value: exceedChecked ? '1' : '0' },
    // issuedDateTime: { value: String(new Date()) },
    // slipNumber: { value: '' },
    estimateLists: {
      type: 'SUBTABLE',
      value: estimates.map(({ estimateId }) => {
        return {
          id: '',
          value: {
            paymentType: { value: '' },
            estimateId: { value: estimateId },
          },
        };
      }),
    },
  };

  return kintoneRecord;
};