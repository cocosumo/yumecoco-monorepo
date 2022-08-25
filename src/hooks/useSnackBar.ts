
import { useContext } from 'react';
import { ISnackBarProvider, SnackBarContext } from '../components/ui/snacks/GlobalSnackBar';

export const useSnackBar = () => {
  return useContext<ISnackBarProvider>(SnackBarContext);
};