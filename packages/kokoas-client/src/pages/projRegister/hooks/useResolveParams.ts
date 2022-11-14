


import { useProjById, useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';

import { getParam } from '../../../helpers/url';
import { convertCustGroupToForm, convertProjToForm } from '../api/convertToForm';
import { TypeOfForm, initialValues } from '../form';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {
  const [initForm, setInitForm] = useState<TypeOfForm>(initialValues);

  const projIdFromURL = getParam('projId');
  const custGroupIdFromURL = getParam('custGroupId');

  const { data: projRec } = useProjById(projIdFromURL || '');

  const { data: custGroupRec } = useCustGroupById(projRec?.custGroupId.value || custGroupIdFromURL || '');


  useEffect(() => {

    if (projIdFromURL) {
      if (projRec && custGroupRec) {
        setInitForm({
          ...initialValues,
          ...convertProjToForm(projRec),
          ...convertCustGroupToForm(custGroupRec),
        });
      }

    } else if (custGroupIdFromURL && !projIdFromURL) {
      if (custGroupRec) {
        setInitForm({
          ...initialValues,
          ...convertCustGroupToForm(custGroupRec),
        });
      }

    } else if (!custGroupIdFromURL && !projIdFromURL) {
      setInitForm(initialValues);
    }
  }, [projRec, custGroupRec, projIdFromURL, custGroupIdFromURL ]);

  return initForm;
};