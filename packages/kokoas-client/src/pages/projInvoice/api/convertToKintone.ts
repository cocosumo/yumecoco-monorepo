import { IInvoices } from 'types';
import { TypeOfForm } from '../form';

export const convertToKintone = ({
  custGroupId,
  estimates,
  plannedPaymentDate,
  exceedChecked,
}: TypeOfForm) => {

  const billingAmount = estimates.reduce((acc, cur) => {
    return acc + +cur.billingAmount;
  }, 0);

  /* formをkintoneの型に変換する */
  const kintoneRecord: Partial<IInvoices> = {
    billingAmount: { value: String(billingAmount) },
    slipNumber: { value: '編集中' },
    plannedPaymentDate: { value: plannedPaymentDate },
    issuedDateTime: { value: String(new Date()) },
    custGroupId: { value: custGroupId },
    exceedChecked: { value: exceedChecked ? '1' : '0' },
    estimateLists: {
      type: 'SUBTABLE',
      value: estimates.filter(({ isForPayment }) => !!isForPayment)
        .map(({
          projId,
          dataId,
          projTypeName,
          estimateId,
          billingAmount: amountPerContract,
          amountType,
        }) => {
          return {
            id: '',
            value: {
              projId: { value: projId },
              dataId: { value: dataId },
              projTypeName: { value: projTypeName },
              estimateId: { value: estimateId },
              amountPerContract: { value: amountPerContract },
              paymentType: { value: amountType },
            },
          };
        }),
    },
  };

  return kintoneRecord;
};