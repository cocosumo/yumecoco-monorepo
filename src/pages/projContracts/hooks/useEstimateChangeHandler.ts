import {  parseISO } from 'date-fns';
import { useFormikContext } from 'formik';
import { useCallback, useState } from 'react';
import { calculateEstimateRecord } from '../../../api/others/calculateEstimateRecord';
import { initialValues, TypeOfForm } from '../form';

/**
 * Wrapper hook to generate contract preview
 * in a declarative way.
 *
 * @returns {object} obj.selectedEstimate 選択された見積のレコード
 * @returns {object} obj.handleChangeEstimate 選択の変更際の関数
 * @deprecated In favor of useResetOnEstimateChage
 */
export const useEstimateChangeHandler = () => {
  const { setValues } = useFormikContext<TypeOfForm>();
  const [selectedEstimate, setSelectedEstimate] = useState<Estimates.main.SavedData>(Object.create(null));
  const [calculatedEstimate, setCalculatedEstimate] = useState<Awaited<ReturnType<typeof calculateEstimateRecord>>>();



  const clearSelectedEstimate = useCallback(() => setSelectedEstimate(Object.create(null)), []);


  const handleChangeEstimate = (
    selected: Estimates.main.SavedData,
    projEstimateId?: string,
    calculated?: Awaited<ReturnType<typeof calculateEstimateRecord>>,
  ) => {

    setCalculatedEstimate(calculated);

    setSelectedEstimate(selected);
    setValues((prev) => {
      const {
        envStatus,
        envDocFileKeys,
        envId,
        $revision,
        支払い: paymentSched,
        hasRefund,
        refundAmt,
      } = selected ?? {};


      const newForm: TypeOfForm = {
        ...prev,
        projEstimateRevision: $revision.value,
        projEstimateId: projEstimateId ?? '',
        envelopeId: envId?.value ?? '',
        envelopeStatus: envStatus?.value as TEnvelopeStatus ?? '',
        envDocFileKeys: envDocFileKeys?.value ?? [],
        envSelectedDoc: envDocFileKeys?.value[0]?.fileKey ?? '',
        paymentFields: paymentSched?.value.length ? paymentSched?.value?.map(({ value: {
          isPayEnabled,
          paymentAmt,
          paymentDate,
        } }) => {


          return {
            checked: Boolean(+isPayEnabled.value ?? 0),
            amount: +(paymentAmt?.value ?? 0),
            payDate: paymentDate?.value ? parseISO(paymentDate.value) : '',
          };
        }) : initialValues.paymentFields,

        hasRefund: Boolean(+hasRefund.value ?? 0),
        refundAmt: +(refundAmt.value ?? 0),

      };

      if (!projEstimateId) clearSelectedEstimate();

      return newForm;
    });
  };


  return {
    selectedEstimate,
    calculatedEstimate,
    handleChangeEstimate,
    clearSelectedEstimate,
  };
};