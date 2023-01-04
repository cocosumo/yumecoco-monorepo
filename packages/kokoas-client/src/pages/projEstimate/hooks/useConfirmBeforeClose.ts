import { useEffect } from 'react';

export const useConfirmBeforeClose = ({
  enabled = false,
}: {
  enabled: boolean
}) => {

  useEffect(() => {
    const listener = (e: BeforeUnloadEvent) => {
      if (enabled) {
        e.preventDefault();
        return (e.returnValue = '行った変更が保存されない可能性があります。');
      }
    };

    window.addEventListener('beforeunload', listener);

    return () => {
      window.removeEventListener('beforeunload', listener);
    };

  }, [enabled]);


};