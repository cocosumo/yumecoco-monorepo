import { useState } from 'react';
import { useContractPreview } from './useContractPreview';

/**
 * Wrapper hook to generate contract preview
 * in a declarative way.
 * 
 * @returns {object} obj.selectedEstimate 選択された見積のレコード
 * @returns {object} obj.handleChangeEstimate 選択の変更際の関数
 */
export const useEstimateChangeHandler = () => {
  const [selectedEstimate, setSelectedEstimate] = useState<Estimates.main.SavedData>();
  const { 
    previewUrl, 
    previewLoading, 
    handlePreview, 
    setValues,
  } = useContractPreview();

  const handleChangeEstimate = (
    selected?: Estimates.main.SavedData,
    projEstimateId?: string,
  ) => {

    setSelectedEstimate(selected);
    setValues((prev) => {

      const { envStatus, envDocFileKeys, envId } = selected ?? {};

      const newForm = {
        ...prev,
        projEstimateId: projEstimateId ?? '',
        envelopeId: envId?.value ?? '',
        envelopeStatus: envStatus?.value as TEnvelopeStatus ?? '',
        envDocFileKeys: envDocFileKeys?.value ?? [],
        envSelectedDoc: envDocFileKeys?.value[0]?.fileKey ?? '',
      };

      handlePreview(newForm);
      return newForm;
    });
  };
  
  return {
    selectedEstimate,
    handleChangeEstimate,
    previewUrl,
    previewLoading,
  };
};