import { getParam } from 'kokoas-client/src/helpers/url';
import { useEstimateById, useProjById, useProjTypeById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertEstimateToForm, convertProjToForm, convertProjTypeToForm } from '../api';
import { initialValues, TypeOfForm } from '../form';

export const useResolveParam2 = () => {
  const [newFormVal, setNewFormVal] = useState<TypeOfForm>(initialValues);
  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');

  const { data: dataProjEstimate } = useEstimateById(projEstimateIdFromURL || '');

  const {
    record: recProjEstimate,
  } = dataProjEstimate || {};

  const { data: recProj } = useProjById(recProjEstimate?.projId.value || projIdFromURL || '');

  const { data: recProjType } = useProjTypeById(recProj?.projTypeId?.value || '');

  useEffect(() => {

    if (projEstimateIdFromURL) {
      if (recProjType && recProj && recProjEstimate) {
        setNewFormVal((prev) => ({
          ...prev,
          ...convertEstimateToForm(recProjEstimate),
          ...convertProjToForm(recProj),
          ...convertProjTypeToForm(recProjType),
        }));

      }
    } else if (projIdFromURL) {
      if (recProjType && recProj) {
        setNewFormVal((prev) => ({
          ...prev,
          ...convertProjToForm(recProj),
          ...convertProjTypeToForm(recProjType),
        }));
      }
    } else {
      setNewFormVal(initialValues);
    }

  }, [ projIdFromURL, projEstimateIdFromURL, recProjType, recProj, recProjEstimate]);

  return {
    initialForm: newFormVal,
    projIdFromURL,
    projEstimateIdFromURL,
  };
};