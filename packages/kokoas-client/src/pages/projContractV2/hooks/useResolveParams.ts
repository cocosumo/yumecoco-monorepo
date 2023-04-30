import { useEffect, useState } from 'react';
import { initialForm } from '../form';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useProjById } from 'kokoas-client/src/hooksQuery';

export const useResolveParams = () => {
  const [newFormVal, setNewFormVal] = useState(initialForm);

  const {
    projId: projIdFromURL,
  } = useURLParams();

  const { data: projData } = useProjById(projIdFromURL || '');

  useEffect(() => {
    if (projIdFromURL && projData) {
      const { projName } = projData;
      setNewFormVal(prev => ({
        ...prev,
        projId: projIdFromURL,
        projName: projName.value,
      }));
    } else {
      setNewFormVal(initialForm);
    }
  }, 
  [
    projIdFromURL, projData,
  ]);

  return { 
    newFormVal, 
  };

};