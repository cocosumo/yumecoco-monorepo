
import { useFormikContext } from 'formik';
import { useCallback, useEffect, useState } from 'react';
import { calculateEstimate } from '../../../api/others/calculateEstimate';
import { getParam } from '../../../helpers/url';
import { useSnackBar } from '../../../hooks';
import { getProjDataById } from '../api/getProjDataById';
import { initialValues, TypeOfForm } from '../form';
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
export const useResetOnIdsChange = () => {
  const { setValues, setTouched, values } = useFormikContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const [calculatedEstimate, setCalculatedEstimate] = useState<Awaited<ReturnType<typeof calculateEstimate>>>();
  const [selectedEstimate, setSelectedEstimate] = useState<Estimates.main.SavedData>();
  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');
  const {
    projEstimateId,
  } = values;

  const {
    data,
  } = useEstimateById({
    projEstimateId,
  });

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

      console.log(newFormData, 'selectedRecord');
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

  /* 工事番号 */
  const handleChangeProjId = useCallback((_projId: string) => {

    if (!_projId) {
      setValues(initialValues);
      return;
    }

    getProjDataById(_projId)
      .then((formData) => {

        setValues(prev => {
          // Typescript do now throw error on {...prev, formData}
          // So I intermediately declare it here.
          // Typings might need improvment ~ Ras 2022.10.15
          const newForm : TypeOfForm = { ...prev, ...formData };
          return newForm;
        });

      })
      .catch((err) => {
        setSnackState({
          open: true,
          message: `レコード取得にエラーが発生しました。${err.message}`,
          severity: 'error',
        });
      });

  }, [setSnackState, setValues]);


  /* Check params on render */
  useEffect(() => {

    setValues(prev => ({
      ...prev,
      projEstimateId: projEstimateIdFromURL ?? '',
      projId: projIdFromURL ?? '',
    }));

    if (projIdFromURL) {
      handleChangeProjId(projIdFromURL);
    }

  }, [
    projEstimateIdFromURL,
    projIdFromURL,
    setValues,
    handleChangeProjId,
  ]);

  return {
    handleChangeProjId,
    calculatedEstimate,
    selectedEstimate,
  };
};