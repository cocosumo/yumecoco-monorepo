


import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { 
  useProjById, 
  useCustGroupById, 
  useProjContractSummary, 
  useAndpadOrderByProjId, 
} from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertCustGroupToForm, convertProjToForm } from '../api/convertToForm';
import { TypeOfForm, initialValues } from '../form';
import { useSnackBar } from 'kokoas-client/src/hooks';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {
  const [initForm, setInitForm] = useState<TypeOfForm>(initialValues);
  const { setSnackState } = useSnackBar();

  const {
    projId: projIdFromURL,
    custGroupId: custGroupIdFromURL,
  } = useURLParams();


  const { data: projRec } = useProjById(projIdFromURL || '');

  const { data: custGroupRec } = useCustGroupById(projRec?.custGroupId.value || custGroupIdFromURL || '');

  const { data: contractSummary } = useProjContractSummary(projRec?.uuid.value);

  const {
    completed,
    hasContract,
  } = contractSummary || {};

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

  useEffect(() => {

    if (projIdFromURL && projRec && custGroupRec && contractSummary) {


      setInitForm({
        ...initialValues,
        hasContract: !!hasContract,
        hasCompletedContract: !!completed,
        andpadDetails,
        ...convertProjToForm(projRec),
        ...convertCustGroupToForm(custGroupRec),
      });

    } else if (custGroupIdFromURL && !projIdFromURL && custGroupRec) {
      setInitForm({
        ...initialValues,
        ...convertCustGroupToForm(custGroupRec),
      });

    } else if (!custGroupIdFromURL && !projIdFromURL) {
      setInitForm(initialValues);

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

  return initForm;
};