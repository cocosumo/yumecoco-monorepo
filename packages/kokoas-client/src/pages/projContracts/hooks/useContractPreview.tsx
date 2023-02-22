import { useFormikContext } from 'formik';
import {  useCallback, useState } from 'react';
import { useSnackBar } from '../../../hooks';
import { useEstimateById } from '../../../hooksQuery/useEstimateById';
import { base64ToBlob } from '../../../lib';
import { downloadContract } from '../api/docusign/downloadContract';
import { TypeOfForm } from '../form';
/**
 * Hook for generating preview url.
 * This also wraps some of useFormikContext's props.
 * @return {Object} result
 * @return {string} previewUrl - The URL of the preview.
 * @return {TFormStatus} result.formStatus - wraps Formik's status to a safer type.
 * @return {TypeOfForm} result.values - Formik values as is.
 * @return {boolean} result.previewLoading - whether preview is still loading
 * @return {boolean} result.formLoading - whether form is busy overall.
 */
export const useContractPreview = () => {
  const { status, values, setValues } = useFormikContext<TypeOfForm>();
  const [previewUrl, setPreviewUrl] = useState('');
  const [selectedDoc, setSelectedDoc] = useState('');
  const [previewLoading, setPreviewLoading] = useState(false);
  const { setSnackState } = useSnackBar();

  const { projEstimateId } = values;
  const { refetch, isLoading } = useEstimateById(projEstimateId);

  const formStatus: TFormStatus = status;
  const formLoading = formStatus === 'busy' || previewLoading || isLoading || !previewUrl;

  const handlePreview = useCallback( async (fileKey = values.envSelectedDoc) => {

    try {
      setPreviewLoading(true);

      const res = await downloadContract({
        form: {
          ...values,
          envSelectedDoc: fileKey,
        },
        fileType: 'pdf',
      });

      if (!res) return;

      const base64 = res;

      if (base64) {
        const blob = base64ToBlob( base64, 'application/pdf' );
        const url = URL.createObjectURL( blob );
        setPreviewUrl((prev) => {
          URL.revokeObjectURL(prev); // Free memory
          return url;
        });
        setSelectedDoc(fileKey);
      } else {
        setPreviewUrl('');
      }

    } catch (err) {
      setPreviewUrl('');
      setSnackState({
        open: true,
        severity: 'error',
        message: `プレビューの取得が失敗しました。管理者をご連絡ください。${err.message}`,
      });

    } finally {
      setPreviewLoading(false);
    }

  }, [
    setSnackState,
    values,
  ]);


  const handleRefetch = async () => {
    setPreviewLoading(true);
    await refetch();
    await handlePreview();
  };


  return {
    handlePreview,
    formStatus,
    previewLoading,
    formLoading,
    previewUrl,
    setValues,
    handleRefetch,
    selectedDoc,
  };
};