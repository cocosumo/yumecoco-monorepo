import { IInvoiceb2c } from 'types';
import { TForm } from '../schema';
import format from 'date-fns/format';



export const convertToKintone = (invoiceB2CData: TForm) => {

  const {
    invoiceId,
    invoiceStatus,
    invoiceDataId,
    projId,
    contractIds,
    //excludedPlanContracts,
    //hasExcludedPlanContractAmt,
    custGroupId,
    custName,
    projName,
    projDataId,
    storeName,
    personInCharge,
    //totalContractAmtAfterTax,
    //totalContractAmtBeforeTax,
    //billedAmount,
    billingAmount,
    //billingTotalAmount,
    invoiceIssueDate,
    scheduledPayDate,
    payMethodPlan,
    invoiceDetails,
    remarks,
  } = invoiceB2CData;

  const convertInvoiceDetails = invoiceDetails.map(({
    billingAmount: detailBillAmt,
    invoiceItem,
  }) => {
    return ({
      id: '',
      value: {
        billingAmountAfterTax: { value: detailBillAmt.toString() },
        invoiceItem: { value: invoiceItem },
      },
    });
  });


  const kintoneRecord: Partial<IInvoiceb2c> = {
    scheduledPayDate: { value: scheduledPayDate ? format(scheduledPayDate, 'yyyy-MM-dd') : '' },
    payMethodPlan: { value: payMethodPlan || '' },
    projId: { value: projId },
    projDataId: { value: projDataId },
    uuid: { value: invoiceId || '' },
    invoiceDataId: { value: invoiceDataId || '' },
    billingTotalAmount: { value: billingAmount.toString() },
    custGroupId: { value: custGroupId },
    paymentStatus: { value: '' },
    invoiceIssueDate: { value: invoiceIssueDate ? format(invoiceIssueDate, 'yyyy-MM-dd') : '' },
    projName: { value: projName },
    contractIds: { value: contractIds.join(',') },
    store: { value: storeName },
    custName: { value: custName },
    PersonInCharge: { value: personInCharge },
    invoiceStatus: { value: invoiceStatus },
    remarks: { value: remarks },
    invoiceDetails: {
      type: 'SUBTABLE',
      value: convertInvoiceDetails,
    },
  };

  return kintoneRecord;

};
