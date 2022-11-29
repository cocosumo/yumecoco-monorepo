import { IInvoices } from 'types';
import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';

export const saveForm = async (form: TypeOfForm) => {

  const {
    invoiceId,
    billingAmount,
    plannedPaymentDate,
    estimates,
  } = form;

  /* formをkintoneの型に変換する */
  const record: Partial<IInvoices> = {
    //amountType: { value: amountType },
    billingAmount: { value: billingAmount },
    plannedPaymentDate: { value: plannedPaymentDate },
    //projId: { value: projId },
    estimateLists: {
      type: 'SUBTABLE',
      value: estimates.map(({ estimateId }) => {
        return {
          id: '',
          value: {
            paymentType: { value: '' },
            estimateId: { value: estimateId },
            projId: { value: '' }, // added as it was causing type error. 
            projTypeName: { value: '' },
            amountPerContract: { value: '' },
            dataId : { value: '' },
          },
        };
      }),
    },
  };


  if (invoiceId) {
    const result = await KintoneRecord.updateRecord({
      app: APPIDS.Invoice,
      id: invoiceId,
      record,
    });

    return {
      ...result,
      id: invoiceId,
    };
  } else {
    return KintoneRecord.addRecord({
      app: APPIDS.Invoice,
      record,
    });
  }

};