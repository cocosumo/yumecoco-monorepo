


import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { 
  useProjById, 
  useCustGroupById, 
  useProjContractSummary, 
  useAndpadOrderByProjId,
  useCustomersByCustGroupId, 
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

  
  const { 
    data: projRec, 
    isLoading: isProjRecLoading, 
  } = useProjById(projIdFromURL || '');

  const { data: custGroupRec } = useCustGroupById(projRec?.custGroupId.value || custGroupIdFromURL || '');
  const { data: custRecs } = useCustomersByCustGroupId(custGroupIdFromURL || '');

  const { data: contractSummary } = useProjContractSummary(projRec?.uuid.value);

  const {
    forceLinkedAndpadSystemId,
  } = projRec || {};

  const {
    completed,
    hasContract,
  } = contractSummary || {};

  const { data: andpadDetails } = useAndpadOrderByProjId(
    projIdFromURL || '',
    {
      onError: (error) => {
        if (!forceLinkedAndpadSystemId?.value && !isProjRecLoading) {
          setSnackState({
            open: true,
            message: error.message,
            severity: 'warning',
            autoHideDuration: 10000,
          });
        }
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

    } else if (custGroupIdFromURL && !projIdFromURL && custGroupRec && custRecs) {
      const {
        postalCode,
        address1,
        address2,
      } = custRecs[0];

      setInitForm({
        ...initialValues,
        ...convertCustGroupToForm(custGroupRec),
        postal: postalCode.value.replace('-', ''),
        address1: address1.value,
        address2: address2.value,
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
    custRecs,
  ]);

  return initForm;
};