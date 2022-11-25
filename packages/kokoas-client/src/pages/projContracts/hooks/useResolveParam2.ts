import { getParam } from 'kokoas-client/src/helpers/url';
import { useCustGroupByProjId, useEstimateById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertProjToForm } from '../api/convertProjToForm';
import { convertToForm } from '../api/convertToForm';
import { initialValues } from '../form';

export const useResolveParams2  = () => {
  const [newFormVal, setNewFormVal] = useState(initialValues);
  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');

  const { data: dataProjEstimate } = useEstimateById(projEstimateIdFromURL || '');
  const { record } = dataProjEstimate || {};
  const projIdfromProjEstimate = record?.uuid.value;

  const { data: dataOthers } = useCustGroupByProjId(projIdfromProjEstimate || projIdFromURL || '');
  const {
    custGroupData,
    projData,
  } = dataOthers || {};

  console.log(custGroupData, projData, dataProjEstimate );

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

    } else { 

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
  };
};