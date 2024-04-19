import { useEffect } from 'react';

export const useConfirmBeforeClose = ({
  open = true,
}:{
  open?: boolean;
}) => {

  useEffect(() => {

    const listener = (_e: BeforeUnloadEvent) => {

      if (open) {
        _e.preventDefault();
      }
    };

    window.addEventListener('beforeunload', listener);

    return () => {
      window.removeEventListener('beforeunload', listener);
    };

  }, [open]);


};