import { useEffect, useState } from 'react';
import { initialForm } from '../form';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useContractById, useEstimateById, useProjById } from 'kokoas-client/src/hooksQuery';
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

  const { data: contractData } = useContractById(contractIdFromURL || '');
  const { data: projData } = useProjById(
    contractData?.projId.value 
    || projEstimateData?.record.projId.value
    || projIdFromURL 
    || '',
  );




  useEffect(() => {
    if (projEstimateIdFromURL && projEstimateData && projData ) {
      const {
        calculated,
      } = projEstimateData;

      const {
        uuid: projId,
        projName,
        custGroupId,
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
        custGroupId: custGroupId.value,
        totalContractAmtAfterTax: totalAmountAfterTax,
        totalContractAmtBeforeTax: totalAmountBeforeTax,
        costPrice: totalCostPrice,
        totalProfit: totalProfit,
        profitRate: roundTo(overallProfitRate * 100, 2),
      }));
    } else if (contractIdFromURL && projData && contractData) {
      const {
        projName,
        custGroupId,
      } = projData;

      setNewFormVal(prev => ({
        ...prev,
        projName: projName.value,
        custGroupId: custGroupId.value,
        ...convertContractToForm(contractData),
      }));

    } else if (projIdFromURL && projData) {
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
  ]);

  return { 
    newFormVal, 

  };

};