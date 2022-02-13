
import { getStoresAsOptions } from '../api/kintone/stores/GET';
import usePromise from './usePromise';

interface Store extends Option {
  territory: string
}

type UseStores = () => { stores: Store[] };

const useStores : UseStores = () => {
  const { data, error, loading } = usePromise(getStoresAsOptions);
  return { stores: (data as Store[]), error, loading }; 

};

export default useStores;