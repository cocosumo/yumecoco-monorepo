import { TAgents, Territory } from 'types';
import {  resolveRoles, resolveAffiliations } from 'api-kintone';
import { useEmployees } from './useEmployees';
import { useCallback } from 'react';




/**
 * フィルタ条件に基づいて社員を返します。
 *
 * 注意：本関数は、混乱を招く仕組みがあるため、以下の点に注意してください。
 *
 * mainStoreId_v2 と mainStore の存在について
 * どちらも、店舗リストに紐づく社員名簿のフィールドです。
 * 前バージョンでは mainStore は店舗リストのレコード番号で紐づいていましたが、
 * テスト環境に移行すると、同じレコード番号にはなりませんでした。
 * そこで、ココアスに関わる全アプリに uuid を実装することにしました。
 * ただし、店舗リストに紐づいているアプリがあるため、それらアプリを特定して、
 * 更新するまで、旧 mainStore や territory などを残しています。
 *
 * 社員名簿：
 * https://rdmuhwtt6gx7.cybozu.com/k/34/
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
            mainStoreId_v2: mainStore,
            affStores,
            affiliation,
            役職: empRole,
            territory_v2: _territory,
          }) => {

            const isInStore = storeIds
              .some((s) => (mainStore.value === s
              || affStores
                .value
                .some(({ value: { affStoreId: _storeId } }) => _storeId.value === s )
              ));

            const isAffiliated = !affiliations.length || affiliations.includes(affiliation.value);
            const isInRole = !roles.length || roles.includes(empRole.value);
            const isInTerritory = !territory || territory === _territory.value;

            return (
              (isInStore
              && isAffiliated
              && isInRole)
              || isInTerritory
            );

          });
      },
      [agentType, storeId, territory],
    ),
  });
};
