import { Zoom } from '@mui/material';
import { CustomAlert } from './CustomAlert';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useDebounce, useLocalStorage } from 'usehooks-ts';
import { TForm } from '../schema';
import { UnsavedMidumoriModal } from './UnsavedMidumoriModal';

export interface IUnsavedMidumori {
  data: TForm | null;
  date: string;
}

export  const localStorageFormRecoveryKey = 'formRecovery:midumori';

export const UnsavedMidumori = () => {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const isMount = useRef(false);
  const [, setFormRecovery] = useLocalStorage<IUnsavedMidumori | undefined>(localStorageFormRecoveryKey, undefined);
  const {
    formState: { isDirty }, 
  } = useFormContext<TForm>();
  
  const values = useWatch<TForm>();

  const debouncedValues = useDebounce(values, 2000);


  useEffect(() => {
    if (isDirty ) {
      // Skip the first isDirty render
      if (isMount.current) { 
        setFormRecovery({
          date: (new Date()).toISOString(),
          data: debouncedValues as TForm,
        });

      } else {
        isMount.current = true;
      }
 
    } else {
      isMount.current = false;
    }
    
  }, [
    isDirty,
    debouncedValues, 
    setFormRecovery,
  ]);

  return (
    <>
      <Zoom in={isDirty}>
        <CustomAlert severity='warning'>
          保存されていない変更があります。保存してください。
        </CustomAlert>
      </Zoom>
      <UnsavedMidumoriModal 
        isInitialRender={isInitialRender}
        setIsInitialRender={setIsInitialRender}
      />
    </>
  );
  
};