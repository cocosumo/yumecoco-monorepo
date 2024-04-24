import { useIsFetching } from '@tanstack/react-query';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useLazyEffect } from './useLazyEffect';


/**
 * Helps to determine if a form, and global cache is idle or not.
 * ※ Inspired by waitForNetworkIdle of puppeteer. 
 *  
 * @param wait - The time to wait before determining if the form is idle or not.
 */
export const useIsFormIdle = (wait = 1000) => {
  const [isIdle, setIsIdle] = useState(false);

  const { formState: {
    isSubmitting,
  } } = useFormContext();
  
  
  const isFetching = useIsFetching();
  
  useLazyEffect(() => {
    if (isSubmitting || Boolean(isFetching)) return;

    setIsIdle(true);
  
  }, [isSubmitting, isFetching], wait);

  return isIdle; 
};

