import { useQuery } from '@tanstack/react-query';
import { getAllRecords } from 'api-kintone';
import { appId } from '../../../../constants';

interface Params {
  condition?: string,
}


export const useContracts = (params?: Params) => {

  const {
    condition,
  } = params || {};
  
  return useQuery(
    ['contracts', condition],
    () => getAllRecords<DB.SavedRecord>({
      app: appId,
      condition,
    }),
  );
};