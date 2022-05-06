

import { getAreas } from '../api/others/address';
import usePromise from './usePromise';

export const usePrefectureArea  = () => {

  const { data,  error, loading } = usePromise(getAreas);


  return {
    areas: (data as string[]),
    error,
    loading,
  };

};
