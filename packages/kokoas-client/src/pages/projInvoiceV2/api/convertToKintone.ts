import { IInvoiceb2c } from 'types';
import { TForm } from '../schema';
import format from 'date-fns/format';
import { Big } from 'big.js';



export const convertToKintone = (invoiceB2CData: TForm) => {

  const {
    //invoiceId,
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
    paymentStatus,
  } = invoiceB2CData;

  const convertInvoiceDetails = invoiceDetails.reduce((acc, {
    invoiceDetailId,
    billingAmount: detailBillAmt,
    invoiceItem,
  }) => {
    if (!detailBillAmt && !invoiceItem) return acc; 

    const detailBillAmtBFTax = Big(detailBillAmt).div(1.1)
      .round()
      .toNumber();

    acc.push({
      id: invoiceDetailId,
      value: {
        billingAmountAfterTax: { value: detailBillAmt.toString() },
        billingAmountBeforeTax: { value: detailBillAmtBFTax.toString() },
        invoiceItem: { value: invoiceItem },
      },
    });

    return acc;

  }, [] as IInvoiceb2c['invoiceDetails']['value']);


  const kintoneRecord: Partial<IInvoiceb2c> = {
    scheduledPayDate: { value: scheduledPayDate ? format(scheduledPayDate, 'yyyy-MM-dd') : '' },
    payMethodPlan: { value: payMethodPlan || '' },
    projId: { value: projId },
    projDataId: { value: projDataId },
    invoiceDataId: { value: invoiceDataId || '' },
    billingTotalAmount: { value: billingAmount.toString() },
    custGroupId: { value: custGroupId },
    custName: { value: custName },
    paymentStatus: { value: paymentStatus },
    invoiceIssueDate: { value: invoiceIssueDate ? format(invoiceIssueDate, 'yyyy-MM-dd') : '' },
    projName: { value: projName },
    contractIds: { value: contractIds.join(',') },
    store: { value: storeName },
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
