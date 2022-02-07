
import { getStoresAsOptions } from '../api/kintone/stores/GET';
import usePromise from './usePromise';

type UseStores = () => { stores: Options };

const useStores : UseStores = () => {
  const { data, error, loading } = usePromise(getStoresAsOptions, [{ label: '取得中', value : '0' }]);
  console.log('Stores loaded', data);
  return { stores: (data as Options), error, loading }; 

};

export default useStores;