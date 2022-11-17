import { toKintoneDateStr } from 'kokoas-client/src/lib/date';
import { IProjestimates } from 'types';
import { paymentLabels, TypeOfForm } from '../form';

export const convertToKintone = (
  {
    paymentFields,
    hasRefund,
    refundAmt,
    projEstimateRevision,
    startDate,
    startDaysAfterContract,
    finishDate,
    finishDaysAfterContract,
    completeDate,
    contractDate,
    payMethod,
    payDestination,
  }: TypeOfForm,
) => {



  const convertedPaymentFields : IProjestimates['支払い']  = {
    type: 'SUBTABLE',
    value: paymentFields.map((
      {
        amount, checked, payDate,
      },
      idx,
    ) => {

      return {
        id: '',
        value: {
          isPayEnabled: { value: (+checked).toString() },
          paymentAmt: { value: amount.toString() },
          paymentType:{ value: paymentLabels[idx] },
          paymentDate: { value: toKintoneDateStr(payDate) },
        },
      };
    }),
  };


  const kintoneRecord :  Partial<IProjestimates> = {

    hasRefund: { value: (+hasRefund).toString() },
    refundAmt: { value: refundAmt.toString() },
    支払い: convertedPaymentFields,
    $revision: {
      type: '__REVISION__',
      value: projEstimateRevision,
    },

    startDate: { value: toKintoneDateStr(startDate) },
    startDaysAfterContract:{ value: startDaysAfterContract.toString() },
    finishDate:{ value: toKintoneDateStr(finishDate) },
    finishDaysAfterContract: { value: finishDaysAfterContract.toString() },
    payDestination: { value: payDestination.toString() },
    payMethod: { value: payMethod },
    completeDate: { value: toKintoneDateStr(completeDate) },
    contractDate: { value: toKintoneDateStr(contractDate) },
    updatedById: { value : kintone.getLoginUser().employeeNumber },
    updateDateTime: { value: toKintoneDateStr(new Date(), true) },

  };

  return kintoneRecord;
};