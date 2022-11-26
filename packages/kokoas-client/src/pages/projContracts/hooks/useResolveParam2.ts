import { getParam } from 'kokoas-client/src/helpers/url';
import { useCustGroupById, useEstimateById, useProjById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertProjToForm } from '../api/convertProjToForm';
import { convertToForm } from '../api/convertToForm';
import { initialValues } from '../form';

export const useResolveParams2  = () => {
  const [newFormVal, setNewFormVal] = useState(initialValues);
  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');

  const { data: dataProjEstimate } = useEstimateById(projEstimateIdFromURL || '');
  const { record, calculated } = dataProjEstimate || {};
  const projIdfromProjEstimate = record?.projId.value;

  const { data: projData } = useProjById(projIdFromURL || projIdfromProjEstimate ||  '');
  const custGroupId = projData?.custGroupId?.value;

  const { data: custGroupData } = useCustGroupById(custGroupId || '');


  useEffect(() => {
    if (projEstimateIdFromURL && dataProjEstimate && projData && custGroupData) {
      const { newFormData } = convertToForm(dataProjEstimate);
      console.log('FIRE!', {
        ...initialValues,
        ...newFormData,
        ...convertProjToForm({ recProj: projData, recCustGroup: custGroupData }),
      });
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


  console.log('newFormVal', newFormVal);
  return {
    newFormVal,
    projIdFromURL,
    projEstimateIdFromURL,
    calculated,
  };
};