import { useEffect, useState } from 'react';
import { initialForm } from '../form';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';

export const useResolveParams = () => {
  const [newFormVal, setNewFormVal] = useState(initialForm);

  const {
    projId: projIdFromURL,
  } = useURLParams();

  useEffect(() => {
    if (projIdFromURL) {
      setNewFormVal(prev => ({
        ...prev,
        projId: projIdFromURL,
        projName: '田口亘様邸　新築付帯工事',
      }));
    } else {
      setNewFormVal(initialForm);
    }
  }, 
  [
    projIdFromURL,
  ]);

  return { 
    newFormVal, 
  };

};