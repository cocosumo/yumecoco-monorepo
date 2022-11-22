import { TAgents, Territory } from 'types';
import {  resolveRoles, resolveAffiliations } from 'api-kintone';
import { useEmployees } from './useEmployees';
import { useCallback } from 'react';


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
  territory?: Territory
}) => {


  return useEmployees({
    select: useCallback(
      (data) => {
        let affiliations: string[] = [];
        let roles: string[] = [];

        if (agentType) {
          affiliations = resolveAffiliations(agentType);
          roles = resolveRoles(agentType);
        }

        return data
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

          });
      },
      [agentType, storeId, territory],
    ),
  });
};