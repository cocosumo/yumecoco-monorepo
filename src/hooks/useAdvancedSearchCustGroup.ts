
import { useCallback } from 'react';

import { advancedSearchCustGroup, AdvancedSearchCustGroupParam } from '../api/kintone/custgroups/GET';
import usePromise from './usePromise';

export const useAdvancedSearchCustGroup = (params: AdvancedSearchCustGroupParam)  => {

  /* useCallBack to avoid inifinite re-render  */
  const  fn = useCallback(
    () => advancedSearchCustGroup(params),
    [params.storeId],
  );
  const { data } = usePromise(fn);

  return (data as CustomerGroupTypes.SavedData[]);

};