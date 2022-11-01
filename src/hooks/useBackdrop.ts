import { useContext } from 'react';
import { BackdropContext } from '../components/ui/backdrop/GlobalBackdrop';

export const useBackdrop = () =>{
  const context = useContext(BackdropContext);

  if (!context) {
    throw new Error(
      'No context found when calling BackdropContext.',
    );
  }
  return context;
};