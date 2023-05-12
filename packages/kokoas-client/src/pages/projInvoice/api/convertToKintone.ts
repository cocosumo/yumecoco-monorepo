import { toKintoneDateStr } from 'kokoas-client/src/lib';
import { IInvoices } from 'types';
import { TypeOfForm } from '../form';

export const convertToKintone = ({
  custGroupId,
  contracts,
  plannedPaymentDate,
  exceedChecked,
  invoiceStatus,
}: TypeOfForm) => {

  const billingAmount = contracts.reduce((acc, cur) => {
    return acc + +cur.billingAmount;
  }, 0);

  /* formをkintoneの型に変換する */
  const kintoneRecord: Partial<IInvoices> = {
    billingAmount: { value: String(billingAmount) },
    slipNumber: { value: '' },
    plannedPaymentDate: { value: toKintoneDateStr(plannedPaymentDate) },
    issuedDateTime: { value: toKintoneDateStr(new Date(), true) },
    custGroupId: { value: custGroupId },
    exceedChecked: { value: exceedChecked ? '1' : '0' },
    invoiceStatus: { value: invoiceStatus },
    estimateLists: {
      type: 'SUBTABLE',
      value: contracts.filter(({ isShow }) => !!isShow)
        .map(({
          projId,
          dataId,
          projTypeName,
          contractId,
          billingAmount: amountPerContract,
          amountType,
        }) => {
          return {
            id: '',
            value: {
              projId: { value: projId },
              dataId: { value: dataId },
              projTypeName: { value: projTypeName },
              estimateId: { value: contractId },
              amountPerContract: { value: String(amountPerContract) },
              paymentType: { value: amountType },
            },
          };
        }),
    },
  };

  return kintoneRecord;
};