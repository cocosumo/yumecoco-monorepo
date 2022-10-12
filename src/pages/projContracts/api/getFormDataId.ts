import { parseISO } from 'date-fns';
import { fetchEstimatesById } from '../../../api/kintone/estimates/GET';
import { calculateEstimateRecord } from '../../../api/others/calculateEstimateRecord';
import { initialValues, TypeOfForm } from '../form';

export const getFormDataById = async (
  projEstimateId: string,
) => {
  if (!projEstimateId) throw new Error('見積番号がありませんでした。');
  const selected = await fetchEstimatesById(projEstimateId);
  const calculated = await calculateEstimateRecord(selected);

  const {
    envStatus,
    envDocFileKeys,
    envRecipients,
    envId,
    $revision,
    支払い: paymentSched,
    hasRefund,
    refundAmt,
    工事名称: projName,
    projId,
    startDate,
    startDaysAfterContract,
    finishDate,
    finishDaysAfterContract,
    payMethod,
    payDestination,
    completeDate,
    signMethod,

  } = selected ?? {};

  const newPaymentFields : TypeOfForm['paymentFields'] = paymentSched?.value.length ? paymentSched?.value?.map(({ value: {
    isPayEnabled,
    paymentAmt,
    paymentDate,
  } }) => {
    return {
      checked: Boolean(+isPayEnabled.value ?? 0),
      amount: +(paymentAmt?.value ?? 0),
      payDate: paymentDate?.value ? parseISO(paymentDate.value) : '',
    };
  }) : initialValues.paymentFields ;

  const newRemainingAmt = newPaymentFields
    .reduce(
      (acc, { amount }) => acc - +amount,
      Math.round(calculated?.totalAmountInclTax || 0),
    );

  const parsedEnvRecipients : IConnectRecipients = JSON.parse(envRecipients.value)?.signers;

  const newFormData : Partial<TypeOfForm> = {
    projId: projId?.value || '',
    projName: projName?.value || '',
    projEstimateRevision: $revision?.value || '',
    projEstimateId: projEstimateId ?? '',


    /* 契約 */
    envelopeId: envId?.value ?? '',
    envelopeStatus: envStatus?.value as TEnvelopeStatus ?? '',
    envDocFileKeys: envDocFileKeys?.value ?? [],
    envSelectedDoc: envDocFileKeys?.value[0]?.fileKey ?? '',
    envRecipients: parsedEnvRecipients,
    signMethod: (signMethod?.value || 'electronic') as TSignMethod,

    /* 支払い */
    startDate: startDate?.value ? parseISO(startDate?.value) : '',
    startDaysAfterContract: +(startDaysAfterContract?.value || 0),
    finishDate:  finishDate?.value ? parseISO(finishDate?.value)   : '',
    finishDaysAfterContract: +(finishDaysAfterContract?.value || 0),
    completeDate: completeDate?.value ? parseISO(completeDate?.value) :  '',
    payDestination: payDestination?.value || '',
    payMethod: (payMethod?.value || '振込') as TypeOfForm['payMethod'],

    paymentFields: newPaymentFields,
    remainingAmt: newRemainingAmt,

    hasRefund: Boolean(+(hasRefund?.value ?? 0)),
    refundAmt: +(refundAmt?.value ?? 0),
  };

  return {
    newFormData: newFormData,
    calculated,
    selected,
  };
};