import { produce } from 'immer';
import { TMaterials, initialValues } from '../form';

/**
 * 請求書(見積もり)のレコードを、formと同様の形式(TMariteals)に落とし込みます
 * 契約一覧表を表示するための前処理で、form形式である必要はありませんが、
 * 必要な情報で構成されているため、form形式に変換することとします
 * @returns 
 */
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