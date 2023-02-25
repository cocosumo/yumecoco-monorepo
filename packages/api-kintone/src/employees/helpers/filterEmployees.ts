import { TAgents, Territory } from 'types';
import { RecordType } from '../config';
import { resolveAffiliations } from './resolveAffiliations';
import { resolveRoles } from './resolveRoles';


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
 * 旧フィールド：mainStoreId, affiliateStores, mainStore
 * 新フィールド: mainStoreId_v2, affStores, mainStore_v2
 *
 * 社員名簿：
 * https://rdmuhwtt6gx7.cybozu.com/k/34/
 */
export const filterEmployees = (
  employees: RecordType[],
  condition: {
    storeId?: string | string[],
    agentType?: TAgents | TAgents[],
    territory?: Territory
  }) => {

  let affiliations: string[] = [];
  let roles: string[] = [];


  const storeIds = ([] as string[]).concat(condition.storeId ?? []).filter(Boolean);

  if (condition.agentType) {
    affiliations = resolveAffiliations(condition.agentType);
    roles = resolveRoles(condition.agentType);
  }

  return employees
    .filter(({
      mainStoreId_v2: mainStore,
      affStores,
      affiliation,
      役職: empRole,
      territory_v2: territory,
    }) => {

      const isStoreSelected = !!storeIds.length;

      const isInStore = storeIds
        .some((s) => (mainStore.value === s
          || affStores
            .value
            .some(({ value: { affStoreId: _storeId } }) => _storeId.value === s )
        ));

      const isAffiliated = !affiliations.length || affiliations.includes(affiliation.value);
      const isInRole = !roles.length || roles.includes(empRole.value);
      const isInTerritory = !condition.territory || condition.territory === territory.value;

      const shouldInclude = isAffiliated
        && isInRole
        && (
          isStoreSelected
            ? (isInStore && isInTerritory)
            : isInTerritory
        );

      return shouldInclude;
    });

};