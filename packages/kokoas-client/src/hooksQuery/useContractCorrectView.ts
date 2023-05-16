

import { useMutation } from '@tanstack/react-query';
import { getCorrectViewUrl } from '../api/docusign/getCorrectViewUrl';
import { useSnackBar } from '../hooks/useSnackBar';


/**
 * 契約の修正画面のリンク取得する
 */
export const useContractCorrectView = () => {
  const { setSnackState } = useSnackBar();

  return useMutation(
    getCorrectViewUrl,
    {
      onError: (error : Error) => {
        setSnackState({
          open: true,
          message: error.message,
          severity: 'error',
        });
      },
      onSuccess: () => {
        setSnackState({
          open: true,
          message: '修正画面を開きます',
          severity: 'success',
        });
      },
      
    },
  );

};
