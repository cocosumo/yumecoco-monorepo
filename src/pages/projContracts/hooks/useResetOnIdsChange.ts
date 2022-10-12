
import { useFormikContext } from 'formik';
import { ComponentProps, useCallback, useEffect, useState } from 'react';
import { calculateEstimate } from '../../../api/others/calculateEstimate';
import { SelectProjEstimates } from '../../../components/ui/selects';
import { getParam } from '../../../helpers/url';
import { useSnackBar } from '../../../hooks';
import { getProjDataById } from '../api/getProjDataById';
import { initialValues, TypeOfForm } from '../form';
import { getFormDataById } from '../api/getFormDataId';


/**
 * Wrapper hook for projId and projEstimateId change handlers
 * in a declarative way.
 *
 * @returns {object} obj.selectedEstimate 選択された見積のレコード
 * @returns {object} obj.handleChangeEstimate 選択の変更際の関数
 */
export const useResetOnIdsChange = () => {
  const { setValues, setTouched } = useFormikContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const [calculatedEstimate, setCalculatedEstimate] = useState<Awaited<ReturnType<typeof calculateEstimate>>>();
  const [selectedEstimate, setSelectedEstimate] = useState<Estimates.main.SavedData>();

  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');

  /* 見積番号 */
  const handleChangeSelectedEstimate : ComponentProps<typeof SelectProjEstimates>['handleChange'] = useCallback(async (
    projEstimateId: string,
  ) => {

    const newData = await getFormDataById(projEstimateId);

    if (!newData) return;

    const {
      newFormData,
      calculated,
      selected,
    }  = newData;

    setValues((prev) => ({
      ...prev,
      ...newFormData,
    }));
    /* Updated calculated estimates */
    setCalculatedEstimate(calculated);
    setSelectedEstimate(selected);
    setTouched({});

  }, [
    setTouched,
    setValues,
  ] );

  /* 工事番号 */
  const handleChangeProjId = useCallback((projId: string) => {

    if (!projId) {
      setValues(initialValues);
      return;
    }

    getProjDataById(projId)
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

    if (projEstimateIdFromURL) {
      handleChangeSelectedEstimate(projEstimateIdFromURL);
    }

    if (projIdFromURL) {
      handleChangeProjId(projIdFromURL);
    }

  }, [
    projEstimateIdFromURL,
    projIdFromURL,
    handleChangeProjId,
    setValues,
    handleChangeSelectedEstimate,
  ]);

  return {
    handleChangeSelectedEstimate,
    handleChangeProjId,
    calculatedEstimate,
    selectedEstimate,
  };
};