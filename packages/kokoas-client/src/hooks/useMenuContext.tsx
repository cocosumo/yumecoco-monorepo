import { useContext } from 'react';
import { MenuContext } from '../components/MainScreen';

export const useMenuContext = () =>{
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error(
      'No context found when calling MenuContext.',
    );
  }
  return context;
};