


import { useIsFetching } from '@tanstack/react-query';
import { useBackdrop } from 'kokoas-client/src/hooks';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useProjById, useCustGroupById, useProjHasContract } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { convertCustGroupToForm, convertProjToForm } from '../api/convertToForm';
import { TypeOfForm, initialValues } from '../form';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {
  const { setBackdropState } = useBackdrop();
  const [initForm, setInitForm] = useState<TypeOfForm>(initialValues);
  const isFetching = useIsFetching();
  const {
    projId: projIdFromURL,
    custGroupId: custGroupIdFromURL,
  } = useURLParams();


  const { data: projRec } = useProjById(projIdFromURL || '');

  const { data: custGroupRec } = useCustGroupById(projRec?.custGroupId.value || custGroupIdFromURL || '');

  const { data: hasContract  = false } = useProjHasContract(projRec?.uuid.value);

  useEffect(() => {

    if (isFetching) {
      setBackdropState({ open: true });
      return;
    }

    if (projIdFromURL && projRec && custGroupRec) {

      setInitForm({
        ...initialValues,
        hasContract,
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

    // バックドロップを隠す
    setBackdropState({ open: false });

  }, [projRec, custGroupRec, projIdFromURL, custGroupIdFromURL, hasContract, isFetching, setBackdropState ]);

  return initForm;
};