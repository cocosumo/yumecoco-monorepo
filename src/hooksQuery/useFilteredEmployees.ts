import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getActiveEmployees } from '../api/kintone/employees/getActiveEmployees';
import { resolveAffiliations, resolveRoles } from '../api/kintone/employees/helpers';
import { EmployeeType } from '../types/commonTypes';

/**
 * 店舗番後で社員を取得する
 *
 */
export const useFilteredEmployees = ({
  storeId,
  agentType,
  territory,
} : {
  storeId: string,
  agentType?: EmployeeType | EmployeeType[],
  territory?: string
}) => {
  let affiliations: string[] = [];
  let roles: string[] = [];

  if (agentType) {
    affiliations = resolveAffiliations(agentType);
    roles = resolveRoles(agentType);
  }

  return useQuery(
    [APPIDS.employees],
    getActiveEmployees,
    {
      staleTime: 1000 * 60 * 60, // 1hr
      select: (data) => data
        .filter(({
          mainStoreId,
          affiliateStores,
          affiliation,
          役職: empRole,
          territory: _territory,
        }) => {

          const isInStore = (
            mainStoreId.value === storeId
          || affiliateStores
            .value
            .some(({ value: { storeId: _storeId } }) => _storeId.value === storeId )
          );


          const isAffiliated = affiliations.length ? affiliations.includes(affiliation.value) : true;
          const isInRole = roles.length ? roles.includes(empRole.value) : true;
          const isInTerritory = territory ? territory === _territory.value : true;

          return (
            isInStore
          && isAffiliated
          && isInRole
          && isInTerritory
          );

        } ),
    },
  );
};