import { useEffect, useState } from 'react';

type UsePromise = <T>(
  promiseFunc: () => Promise<any>, initialValue?: T
  ) => {
    data?: T, error: object, loading: boolean
  };

export const usePromise : UsePromise = ( promiseFunc, initialValue ) => {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    console.log('EEEEEE', data);
    promiseFunc()
      .then(resp => setData(resp ))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [promiseFunc]);
  return { data, error, loading };

};

export default usePromise;