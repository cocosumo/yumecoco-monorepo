import { useEffect, useState } from 'react';
import { useSnackBar } from './useSnackBar';

/**
 * Just like usePromise, but displays a snackbar based on settings.
 * 
 * @param param0 The parameters names should be self-explanatory.
 * @returns {object} Contains, data, loading state, and error string. 
 */
export const usePromiseWithNotify : <T>(param: {
  promiseFunc: (() => Promise<any>) | null, 
  initialValue: T,
  isNotifSuccess?: boolean
  successMessage?: string
}) => {
  data: T, error: string, loading: boolean
} = ( 
  {
    promiseFunc, 
    initialValue,
    isNotifSuccess = false, 
    successMessage = '成功しました。',
  },
) => {

  const [data, setData] = useState(initialValue);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { setSnackState } = useSnackBar();

  useEffect(()=> {
    
    if (!promiseFunc) return;

    promiseFunc()
      .then(resp => {
        setData(resp);
        if (isNotifSuccess) {
          setSnackState({
            open: true,
            message: successMessage,
            severity: 'success',
          });
        }
      })
      .catch((err: any) => {
        setError(err.message);
        setSnackState({
          open: true,
          message: err.message,
          severity: 'error',
        });
      })
      .finally(() => setLoading(false));
  }, [promiseFunc, isNotifSuccess]);
  return { data, error, loading };

};