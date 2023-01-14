import { TAgents, Territory } from 'types';
import {  resolveRoles, resolveAffiliations } from 'api-kintone';
import { useEmployees } from './useEmployees';
import { useCallback } from 'react';


/**
 * Return employees based on filter conditions
 *
 */
export const useFilteredEmployees = ({
  storeId = [],
  agentType,
  territory,
} : {
  storeId?: string | string[],
  agentType?: TAgents | TAgents[],
  territory?: Territory
}) => {


  return useEmployees({
    select: useCallback(
      (data) => {
        let affiliations: string[] = [];
        let roles: string[] = [];
        const storeIds = ([] as string[]).concat(storeId).filter(Boolean);

        if (agentType) {
          affiliations = resolveAffiliations(agentType);
          roles = resolveRoles(agentType);
        }

        return data
          .filter(({
            mainStoreId_v2,
            affStores,
            affiliation,
            役職: empRole,
            territory_v2: _territory,
          }) => {

            const isInStore = storeIds.some((s) => (mainStoreId_v2.value === s
              || affStores
                .value
                .some(({ value: { affStoreId: _storeId } }) => _storeId.value === s )
            )); 

            const isAffiliated = !affiliations.length || affiliations.includes(affiliation.value);
            const isInRole = !roles.length || roles.includes(empRole.value);
            const isInTerritory = !territory || territory === _territory.value;

            return (
              isInStore
              && isAffiliated
              && isInRole
              && isInTerritory
            );

          });
      },
      [agentType, storeId, territory],
    ),
  });
};