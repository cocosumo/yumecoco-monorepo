import { ParsedInvoiceReport } from 'types';

export const parseInvoiceDat = async (
  recInvoiceDat: DBInvoices.SavedData,
): Promise<ParsedInvoiceReport> => {

  const {
    billingAmount,
    custGroupId,
    estimateLists: { value: estimates },
    issuedDateTime,
    plannedPaymentDate,
    slipNumber,
  } = recInvoiceDat;

  return {
    billingAmount: +billingAmount.value,
    slipNumber: slipNumber.value,
    plannedPaymentDate: plannedPaymentDate.value,
    issuedDateTime: issuedDateTime.value,
    custGroupId: custGroupId.value,
    estimateLists: estimates.map(({ value: estimate }) => {
      return {
        projId: estimate.projId.value,
        dataId: estimate.dataId.value,
        projTypeName: estimate.projTypeName.value,
        estimateId: estimate.estimateId.value,
        amountPerContract: +estimate.amountPerContract.value,
        paymentType: estimate.paymentType.value,
      };
    }),
  };

};