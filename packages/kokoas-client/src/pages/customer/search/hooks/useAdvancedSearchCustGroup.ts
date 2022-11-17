import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { RecordStatus } from 'types';
import { advancedSearchCustGroup } from '../api/advancedSearchCustGroup';


export interface AdvancedSearchCustGroupParam {
  storeId?: string,
  custName?: string,
  phone?: string,
  address?: string,
  email?: string,
  yumeAG?: string,
  cocoAG?: string,
  cocoConst?: string,
  custType?: string,
  recordStatus?: RecordStatus[],
}

export const useAdvancedSearchCustGroup = (params: AdvancedSearchCustGroupParam) => {
  return useQuery(
    [AppIds.custGroups, params],
    () => advancedSearchCustGroup(params),
  );
};