import { useEffect, useState } from 'react';

type UsePromise = (promiseFunc: () => Promise<any>, initialValue?: null | object) => { data: object | null, error: object, loading: boolean };

const usePromise : UsePromise = ( promiseFunc, initialValue = null ) => {
  const [data, setData] = useState(initialValue);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    promiseFunc()
      .then(resp => setData(resp))
      .catch(setError)
      .finally(() => setLoading(false));
  }, [promiseFunc]);
  return { data, error, loading };

};

export default usePromise;