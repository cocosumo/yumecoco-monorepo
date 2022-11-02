import { useQuery } from '@tanstack/react-query';
import { TAgents } from 'types';
import { APPIDS } from '../api/kintone';
import { getActiveEmployees } from '../api/kintone/employees/getActiveEmployees';
import { resolveAffiliations, resolveRoles } from '../api/kintone/employees/helpers';

/**
 * Return employees based on filter conditions
 *
 */
export const useFilteredEmployees = ({
  storeId,
  agentType,
  territory,
} : {
  storeId: string,
  agentType?: TAgents | TAgents[],
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