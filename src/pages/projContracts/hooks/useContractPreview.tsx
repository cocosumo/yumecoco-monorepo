import { useFormikContext } from 'formik';
import {  useState } from 'react';
import { useSnackBar } from '../../../hooks';
import { base64ToBlob } from '../../../lib';
import { downloadContract } from '../api/docusign/downloadContract';
import { getProjEstimatesDataById } from '../api/getProjEstimatesDataById';
import { TypeOfForm } from '../form';
import useDeepCompareEffect from 'use-deep-compare-effect';
/**
 * Hook for generating preview url.
 * This also wraps some of useFormikContext's props.
 * @param {ProjectEstimates.SavedData[]}
 * @return {Object} result
 * @return {string} previewUrl - The URL of the preview.
 * @return {TFormStatus} result.formStatus - wraps Formik's status to a safer type.
 * @return {TypeOfForm} result.values - Formik values as is.
 * @return {boolean} result.previewLoading - whether preview is still loading
 * @return {boolean} result.formLoading - whether form is busy.
 */
export const useContractPreview = (estimatesRec: ProjectEstimates.SavedData[]) => {
  const { values, status, setValues } = useFormikContext<TypeOfForm>();
  const {
    projEstimateId,
  } = values;
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewLoading, setPreviewLoading] = useState(true);
  const { setSnackState } = useSnackBar();

  const formStatus: TFormStatus = status;
  const formLoading = formStatus === 'busy' || previewLoading;

  const handlePreview = async (newForm: TypeOfForm) => {
    try {
      setPreviewLoading(true);

      const res = await downloadContract({
        form: newForm,
        fileType: 'pdf',
      });

      if (!res) return;
      if (previewUrl) URL.revokeObjectURL(previewUrl); // free Memory

      const base64 = res;

      if (base64) {
        const blob = base64ToBlob( base64, 'application/pdf' );
        const url = URL.createObjectURL( blob );
        setPreviewUrl(url);
      } else {
        setPreviewUrl('');
      }

    } catch (err) {

      setSnackState({
        open: true,
        severity: 'error',
        message: `プレビューの取得が失敗しました。管理者をご連絡ください。${err.message}`,
      });

    } finally {
      setPreviewLoading(false);
    }

  };

  useDeepCompareEffect(()=>{

    if (
      projEstimateId
      && formStatus !== 'busy'
      && estimatesRec.length
    ) {

      getProjEstimatesDataById(estimatesRec, projEstimateId)
        .then((formData) => {

          /* 見積もりのものをフォームに格納 */
          setValues((prev) => {
            const newFormState = { ...prev, ...formData };
            handlePreview(newFormState);
            return newFormState;
          });
        })
        .catch((err) => {
          setSnackState({
            open: true,
            message: `レコード取得にエラーが発生しました。${err.message}`,
            severity: 'error',
          });
        });
    }

  }, [projEstimateId, estimatesRec]);

  return {
    formStatus,
    previewLoading,
    formLoading,
    previewUrl,
    values,
  };
};