import { getParam } from 'kokoas-client/src/helpers/url';
import { useEstimateById, useProjById, useProjTypeById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertEstimateToForm, convertProjToForm, convertProjTypeToForm } from '../api';
import { initialValues, KeyOfForm, TypeOfForm } from '../form';

export const useResolveParam = () => {
  const [newFormVal, setNewFormVal] = useState<TypeOfForm>(initialValues);
  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');
  const clearFields = getParam('clearFields') as KeyOfForm;

  const { data: dataProjEstimate } = useEstimateById(projEstimateIdFromURL || '');

  const {
    record: recProjEstimate,
  } = dataProjEstimate || {};

  const { data: recProj } = useProjById(recProjEstimate?.projId.value || projIdFromURL || '');

  const { data: recProjType } = useProjTypeById(recProj?.projTypeId?.value || '');

  useEffect(() => {

    if (projEstimateIdFromURL && recProjType && recProj && recProjEstimate) {
      setNewFormVal((prev) => ({
        ...prev,
        ...convertEstimateToForm(recProjEstimate),
        ...convertProjToForm(recProj),
        ...convertProjTypeToForm(recProjType),
      }));
    } else if (projIdFromURL && recProjType && recProj) {

      /* Initialize profit rate when only projId is provided */
      const profRate = +recProjType.profitRate.value;
      setNewFormVal((prev) => ({
        ...prev,
        ...convertProjToForm(recProj),
        ...convertProjTypeToForm(recProjType),
        projTypeProfit: profRate,
      }));
      

    } else {
      setNewFormVal(initialValues);
    }

  }, [ projIdFromURL, projEstimateIdFromURL, recProjType, recProj, recProjEstimate, clearFields]);


  console.log(newFormVal);
  return {
    initialForm: newFormVal,
    projIdFromURL,
    projEstimateIdFromURL,
  };
};