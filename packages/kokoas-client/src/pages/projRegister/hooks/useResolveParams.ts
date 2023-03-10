


import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useProjById, useCustGroupById, useProjContractSummary } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertCustGroupToForm, convertProjToForm } from '../api/convertToForm';
import { TypeOfForm, initialValues } from '../form';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {
  const [initForm, setInitForm] = useState<TypeOfForm>(initialValues);
  const {
    projId: projIdFromURL,
    custGroupId: custGroupIdFromURL,
  } = useURLParams();


  const { data: projRec } = useProjById(projIdFromURL || '');

  const { data: custGroupRec } = useCustGroupById(projRec?.custGroupId.value || custGroupIdFromURL || '');

  const { data: contractSummary } = useProjContractSummary(projRec?.uuid.value);

  useEffect(() => {

    if (projIdFromURL && projRec && custGroupRec && contractSummary) {
      const {
        completed,
        hasContract,
      } = contractSummary;

      setInitForm({
        ...initialValues,
        hasContract,
        hasCompetedContract: !!completed,
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



  }, [projRec, custGroupRec, projIdFromURL, custGroupIdFromURL, contractSummary ]);

  return initForm;
};