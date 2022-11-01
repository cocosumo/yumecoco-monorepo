
import { getStoresAsOptions } from '../api/kintone/stores/GET';
import usePromise from './usePromise';

type UseStores = () => ({ stores: Options });

export const useStores : UseStores = () => {
  const { data, error, loading } = usePromise<Options>(getStoresAsOptions);

  return {
    stores: (data as Options),
    error,
    loading,
  };

};

export default useStores;