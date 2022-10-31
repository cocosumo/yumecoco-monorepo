import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { getActiveEmployees } from '../api/kintone/employees/getActiveEmployees';

/**
 * 店舗番後で社員を取得する
 *
 */
export const useFilteredEmployees = ({
  storeId,
  agentType,
} : {
  storeId: string,
  agentType: AgentType
}) => {
  return useQuery(
    [APPIDS.employees],
    getActiveEmployees,
    { select: (data) => data
      .filter(({
        mainStoreId,
        affiliateStores,
      }) => {

        const isInStore = (
          mainStoreId.value === storeId
          || affiliateStores
            .value
            .some(({ value: { storeId: _storeId } }) => _storeId.value === storeId )
        );

        return (
          mainStoreId.value === storeId
          || affiliateStores
            .value
            .some(({ value: { storeId: _storeId } }) => _storeId.value === storeId )
        );

      } ),
    },
  );
};