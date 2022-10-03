import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { toKintoneDateStr } from '../../../lib/date';
import { paymentLabels, TypeOfForm } from '../form';

const convertToKintone = (
  {
    paymentFields,
    hasRefund,
    refundAmt,
  }: TypeOfForm,
) => {



  const convertedPaymentFields : Estimates.main.SavedData['支払い']  = {
    type: 'SUBTABLE',
    value: paymentFields.map((
      {
        amount, checked, payDate,
      },
      idx,
    ) => ({
      id: 'auto',
      value: {
        isPayEnabled: { value: (+checked).toString() },
        paymentAmt: { value: amount.toString() },
        paymentType:{ value: paymentLabels[idx] },
        paymentDate: { value: toKintoneDateStr(payDate) },
      },
    })),
  };

  const kintoneRecord :  Partial<Estimates.main.SavedData> = {
    hasRefund: { value: (+hasRefund).toString() },
    refundAmt: { value: refundAmt.toString() },
    支払い: convertedPaymentFields,
  };

  return kintoneRecord;
};


/**
 * Main save process
 *
 * @param {TypeofForm} form
 * @returns {Promise<{id: string, revision: string}>}
 *  */
export const saveContractDetails = async (
  form: TypeOfForm,
) => {
  const { projEstimateId } = form;

  if (!projEstimateId) throw new Error('Invalid project id.');

  const record = convertToKintone(form);

  const result = await KintoneRecord.updateRecord({
    app: APPIDS.projectEstimate,
    id: projEstimateId,
    record,
  });

  return { ...result, id: projEstimateId };
};