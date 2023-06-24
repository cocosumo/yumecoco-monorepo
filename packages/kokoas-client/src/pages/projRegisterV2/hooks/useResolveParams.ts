import { useEffect, useState } from 'react';
import { initialValues } from '../form';
import { useSnackBar } from 'kokoas-client/src/hooks';
import { useURLParamsV2 } from 'kokoas-client/src/hooks/useURLParamsV2';
import { useAndpadOrderByProjId, useCustGroupById, useProjById, useProjContractSummary } from 'kokoas-client/src/hooksQuery';
import { convertProjToForm } from '../api/convertProjToForm';
import { convertCustGroupToForm } from '../api/convertCustGroupToForm';

export const useResolveParams = () => {
  const [newFormVal, setNewFormVal] = useState(initialValues);
  const { setSnackState } = useSnackBar();

  const {
    projId: projIdFromURL,
    custGroupId: custGroupIdFromURL,
  } = useURLParamsV2();

  const { data: projRec } = useProjById(projIdFromURL || '');

  const { data: custGroupRec } = useCustGroupById(projRec?.custGroupId.value || custGroupIdFromURL || '');

  const { data: contractSummary } = useProjContractSummary(projRec?.uuid.value);

  const { data: andpadDetails } = useAndpadOrderByProjId(
    projIdFromURL || '',
    {
      onError: (error) => {
        setSnackState({
          open: true,
          message: error.message,
          severity: 'warning',
          autoHideDuration: 10000,
        });
      },
    },
  );  

  const {
    completed,
    hasContract,
  } = contractSummary || {};

  useEffect(() => {

    if (projIdFromURL && projRec && custGroupRec && contractSummary) {


      setNewFormVal({
        ...initialValues,
        hasContract: !!hasContract,
        hasCompletedContract: !!completed,
        andpadDetails,
        ...convertProjToForm(projRec),
        ...convertCustGroupToForm(custGroupRec),
      });

    } else if (custGroupIdFromURL && !projIdFromURL && custGroupRec) {
      setNewFormVal({
        ...initialValues,
        ...convertCustGroupToForm(custGroupRec),
      });

    } else if (!custGroupIdFromURL && !projIdFromURL) {
      setNewFormVal(initialValues);

    }
  }, [
    projRec, 
    custGroupRec, 
    projIdFromURL, 
    custGroupIdFromURL,
    hasContract,
    completed,
    contractSummary,
    andpadDetails,
  ]);

  return { newFormVal };
};