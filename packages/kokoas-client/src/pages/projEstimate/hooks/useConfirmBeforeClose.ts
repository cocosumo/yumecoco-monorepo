import { useEffect } from 'react';
import { useFormState } from 'react-hook-form';

export const useConfirmBeforeClose = () => {

  const { isDirty } = useFormState();

  useEffect(() => {
    console.log('DIRTY!', isDirty);
    const listener = (e: BeforeUnloadEvent) => {

      if (isDirty) {
        e.preventDefault();
        return (e.returnValue = '行った変更が保存されない可能性があります。');
      }
    };

    window.addEventListener('beforeunload', listener);

    return () => {
      window.removeEventListener('beforeunload', listener);
    };

  }, [isDirty]);


};