import { useEffect, useState } from 'react';
import { initialForm } from '../form';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useContractById, useProjById } from 'kokoas-client/src/hooksQuery';
import { convertContractToForm } from '../api/convertContractToForm';

export const useResolveParams = () => {
  const [newFormVal, setNewFormVal] = useState(initialForm);

  const {
    projId: projIdFromURL,
    contractId: contractIdFromURL,
  } = useURLParams();

  const { data: contractData } = useContractById(contractIdFromURL || '');
  const { data: projData } = useProjById(
    contractData?.projId.value || projIdFromURL || '',
  );



  useEffect(() => {

    if (contractIdFromURL && projData && contractData) {
      const {
        projName,
        custGroupId,
      } = projData;

      setNewFormVal(prev => ({
        ...prev,
        projName: projName.value,
        custGroupId: custGroupId.value,
        ...convertContractToForm(contractData),
      }));

    } else if (projIdFromURL && projData) {
      const { projName, custGroupId } = projData;
      setNewFormVal(prev => ({
        ...prev,
        projId: projIdFromURL,
        projName: projName.value,
        custGroupId: custGroupId.value,
      }));
    } else {
      setNewFormVal(initialForm);
    }
  }, 
  [
    projIdFromURL, 
    contractIdFromURL,
    projData,
    contractData,
  ]);

  return { 
    newFormVal, 

  };

};