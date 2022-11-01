

import { getPrefectures } from '../api/others/address';
import usePromise from './usePromise';

export const usePrefectures  = () => {

  const { data,  error, loading } = usePromise(getPrefectures);
  return {
    prefectures: (data as string[]),
    error,
    loading,
  };

};
