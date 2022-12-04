import { calculateEstimateRecord } from 'api-kintone/src/estimates/calculation/calculateEstimateRecord';
import { parseISO } from 'date-fns';
import { IConnectRecipients, IProjestimates, TEnvelopeStatus, TSignMethod } from 'types';
import { parseKintoneDate } from '../../../lib/date';
import { initialValues, TypeOfForm } from '../form';

export const convertToForm = ({
  record,
  calculated,
}:{
  record: IProjestimates
  calculated: ReturnType<typeof calculateEstimateRecord >
}) => {

  const {
    uuid: projEstimateId,
    envStatus,
    envDocFileKeys,
    envRecipients,
    envId,
    contractDate,
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

  } = record ?? {};

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
      Math.round(calculated?.estimateSummary.totalAmountAfterTax || 0),
    );

  const parsedEnvRecipients : IConnectRecipients = JSON.parse(envRecipients?.value || '{}' )?.signers;

  const newFormData : Partial<TypeOfForm> = {
    projId: projId?.value || '',
    projName: projName?.value || '',
    projEstimateRevision: $revision?.value || '',
    projEstimateId: projEstimateId?.value ?? '',


    /* 契約 */
    envelopeId: envId?.value ?? '',
    envelopeStatus: envStatus?.value as TEnvelopeStatus ?? '',
    envDocFileKeys: envDocFileKeys?.value ?? [],
    envSelectedDoc: envDocFileKeys?.value[0]?.fileKey ?? '',
    envRecipients: parsedEnvRecipients,
    signMethod: (signMethod?.value || 'electronic') as TSignMethod,
    contractDate: parseKintoneDate(contractDate.value),

    /* 支払い */
    startDate: parseKintoneDate(startDate?.value),
    startDaysAfterContract: +(startDaysAfterContract?.value || 0),
    finishDate: parseKintoneDate(finishDate?.value),
    finishDaysAfterContract: +(finishDaysAfterContract?.value || 0),
    completeDate:parseKintoneDate( completeDate?.value),
    payDestination: payDestination?.value || '',
    payMethod: (payMethod?.value || '振込') as TypeOfForm['payMethod'],

    paymentFields: newPaymentFields,
    remainingAmt: newRemainingAmt,

    hasRefund: Boolean(+(hasRefund?.value ?? 0)),
    refundAmt: +(refundAmt?.value ?? 0),
  };

  return {
    newFormData,
    newCalculated : calculated,
  };
};