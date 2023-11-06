import { useEffect, useState } from 'react';
import { initialForm } from '../form';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useContractById, useContractsByEstId, useEstimateById, useProjById } from 'kokoas-client/src/hooksQuery';
import { convertContractToForm } from '../api/convertContractToForm';
import { roundTo } from 'libs';

export const useResolveParams = () => {
  const [newFormVal, setNewFormVal] = useState(initialForm);

  const {
    projId: projIdFromURL,
    contractId: contractIdFromURL,
    projEstimateId: projEstimateIdFromURL,
  } = useURLParams();


  const { data: projEstimateData } = useEstimateById(projEstimateIdFromURL || '');
  const { data: contractsByEstId } = useContractsByEstId(projEstimateIdFromURL || '');

  const { data: contractData } = useContractById(contractIdFromURL || '');

  const { data: projData } = useProjById(
    contractData?.projId.value 
    || projEstimateData?.record.projId.value
    || projIdFromURL 
    || '',
  );




  useEffect(() => {
    if (projEstimateIdFromURL && projEstimateData && projData ) {
      // 見積からの新規
      const {
        calculated,
      } = projEstimateData;

      const contractDataByEstId = contractsByEstId?.[0];

      const {
        uuid: projId,
        projName,
        custGroupId,
        projTypeId,
      } = projData;

      const {
        totalAmountAfterTax,
        totalAmountBeforeTax,
        totalCostPrice,
        totalProfit,
        overallProfitRate,
      } = calculated.summary;

      setNewFormVal(prev => ({
        ...prev,
        projEstimateId: projEstimateIdFromURL,
        projId: projId.value,
        projName: projName.value,
        projTypeId: projTypeId.value,
        custGroupId: custGroupId.value,
        totalContractAmtAfterTax: totalAmountAfterTax,
        totalContractAmtBeforeTax: totalAmountBeforeTax,
        costPrice: totalCostPrice,
        totalProfit: totalProfit,
        profitRate: roundTo(overallProfitRate * 100, 2),
        ...(contractDataByEstId ? convertContractToForm(contractDataByEstId) : {}),
      }));
    } else if (contractIdFromURL && projData && contractData) {
      // 契約編集

      const {
        projName,
        custGroupId,
        projTypeId,
      } = projData;

      setNewFormVal(prev => ({
        ...prev,
        projName: projName.value,
        projTypeId: projTypeId.value,
        custGroupId: custGroupId.value,
        ...convertContractToForm(contractData),
      }));

    } else if (projIdFromURL && projData) {
      // 新規
      const { projName, custGroupId } = projData;
      setNewFormVal(prev => ({
        ...prev,
        projId: projIdFromURL,
        projName: projName.value,
        custGroupId: custGroupId.value,
      }));
    } else {
      setNewFormVal(initialForm);
    }
  }, 
  [
    projIdFromURL, 
    contractIdFromURL,
    projEstimateIdFromURL,
    projData,
    contractData,
    projEstimateData,
    contractsByEstId,
  ]);

  return { 
    newFormVal, 

  };

};