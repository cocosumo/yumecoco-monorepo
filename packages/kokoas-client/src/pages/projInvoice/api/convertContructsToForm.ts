import { produce } from 'immer';
import { TMaterials, initialValues } from '../form';

export const convertContructsToForm: TMaterials[] = () => {

  const newValues = produce(initialValues, (draft) => {
    newEstimates?.forEach((data, idx) => {
      const targetInvoice = datInvoicesSummary?.find(invoice => invoice.dataId === data.dataId);
      const {
        billedAmount = 0,
        createdAmount = 0,
      } = targetInvoice || {};
      const newIsForPayment = (estimateIdFromURL || '').split(',').includes(data.estimateId);

      draft.estimates[idx] = {
        estimateIndex: String(idx),
        projId: data.projId,
        projTypeName: data.projTypeName,
        dataId: data.dataId,
        contractAmount: data.contractAmount,
        nonTaxableAmount: data.nonTaxableAmount,
        billedAmount: billedAmount,
        createdAmount: createdAmount,
        billingAmount: data.billingAmount,
        amountType: '',
        isForPayment: data.isForPayment || newIsForPayment,
        estimateId: data.estimateId,
      };
    });
  });

  return newValues;
};