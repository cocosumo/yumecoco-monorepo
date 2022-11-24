import { useState, useEffect } from 'react';
import { initialValues, TypeOfForm } from '../form';
import { getParam } from 'kokoas-client/src/helpers/url';

export const useResolveParam = () => {
  const [initialState, setInitialState] = useState<TypeOfForm>(initialValues);
  const custGroupId = getParam('custGroupId') ?? '';
  const passedProjId = getParam('projId');

  const {} = use


  useEffect(() => {

  }, []);

  /*   useEffect(()=>{

    if (!recordId) return;

    getFormDataById(recordId)
    .then(resp => {
      setInitialState(resp);
    });

}, [recordId]); */
  return {
    initialState,
    custGroupId,
    passedProjId,
  };
};