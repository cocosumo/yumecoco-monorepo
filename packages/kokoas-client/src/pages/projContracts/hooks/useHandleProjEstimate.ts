
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { calculateEstimate } from '../../../api/others/calculateEstimate';
import {  TypeOfForm } from '../form';
import { normalizedData } from '../api/getFormDataId';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { isEmpty } from 'lodash';
import { useEstimateById } from '../../../hooksQuery/useEstimateById';


/**
 * Wrapper hook for projId and projEstimateId change handlers
 * in a declarative way.
 *
 * @returns {object} obj.selectedEstimate 選択された見積のレコード
 * @returns {object} obj.handleChangeEstimate 選択の変更際の関数
 */
export const useHandleProjEstimate = () => {
  const { setValues, setTouched, values } = useFormikContext<TypeOfForm>();
  const [calculatedEstimate, setCalculatedEstimate] = useState<Awaited<ReturnType<typeof calculateEstimate>>>();
  const [selectedEstimate, setSelectedEstimate] = useState<Estimates.main.SavedData>();

  const {
    projEstimateId,
  } = values;

  const {
    data,
    isFetching,
  } = useEstimateById(projEstimateId);

  const {
    calculated,
    record : selectedRecord,
  } = data || {};

  useDeepCompareEffect(() => {

    if (selectedRecord && !isEmpty(selectedRecord)) {
      const {
        newFormData,
        newCalculated,
      } = normalizedData(selectedRecord, calculated);

      setValues((prev) => ({
        ...prev,
        ...newFormData,
      }));
      /* Updated calculated estimates */
      setCalculatedEstimate(newCalculated);
      setSelectedEstimate(selectedRecord);
      setTouched({});
    }

  }, [selectedRecord || {}]);


  return {
    calculatedEstimate,
    selectedEstimate,
    isFetching,
  };
};