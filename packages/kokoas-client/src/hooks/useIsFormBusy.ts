import { useIsFetching } from '@tanstack/react-query';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLazyEffect } from './useLazyEffect';


/**
 * Helps to determine if a form, and global cache is busy or not.
 * Inspiration from waitForNetworkIdle of puppeteer. 
 *  
 * @param wait - The time to wait before determining if the form is busy or not.
 */
export const useIsFormBusy = (wait = 1000) => {
  const [isBusy, setIsBusy] = useState(true);

  const { formState: {
    isSubmitting,
  } } = useFormContext();
  
  
  const isFetching = useIsFetching();
  
  useLazyEffect(() => {
    if (isSubmitting || Boolean(isFetching)) return;

    setIsBusy(false);
  
  }, [isSubmitting, isFetching], wait);

  return isBusy; 
};

