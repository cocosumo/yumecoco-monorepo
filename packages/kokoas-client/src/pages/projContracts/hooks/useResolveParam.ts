
import { useCustGroupById, useEstimateById, useProjById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertProjToForm } from '../api/convertProjToForm';
import { convertToForm } from '../api/convertToForm';
import { initialValues } from '../form';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';

export const useResolveParams  = () => {
  const [newFormVal, setNewFormVal] = useState(initialValues);
  const {
    projEstimateId: projEstimateIdFromURL,
    projId: projIdFromURL,
  } = useURLParams();

  const { data: dataProjEstimate } = useEstimateById(projEstimateIdFromURL || '');
  const { record, calculated } = dataProjEstimate || {};
  const projIdfromProjEstimate = record?.projId.value;

  const { data: projData } = useProjById(projIdFromURL || projIdfromProjEstimate ||  '');
  const custGroupId = projData?.custGroupId?.value;

  const { data: custGroupData } = useCustGroupById(custGroupId || '');


  useEffect(() => { 
    if (projEstimateIdFromURL && dataProjEstimate && projData && custGroupData) {
      const { newFormData } = convertToForm(dataProjEstimate);
      setNewFormVal({
        ...initialValues,
        ...newFormData,
        ...convertProjToForm({ recProj: projData, recCustGroup: custGroupData }),
      });
      
    } else if (projIdFromURL && projData && custGroupData) {
      setNewFormVal({
        ...initialValues,
        ...convertProjToForm({ recProj: projData, recCustGroup: custGroupData }),
      });

    } else if (!projEstimateIdFromURL && !dataProjEstimate) { 
      setNewFormVal(initialValues);
    }
  }, [
    projIdFromURL,
    projEstimateIdFromURL,
    dataProjEstimate,
    projData,
    custGroupData,
  ]);

  return {
    newFormVal,
    projIdFromURL,
    projEstimateIdFromURL,
    calculated,
  };
};