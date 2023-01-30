import { useEstimates } from 'kokoas-client/src/hooksQuery';
import { TEnvelopeStatus } from 'types';

/**
 *
 *  フィルター条件から、契約データを取得
 *
 * 他のところで必要になったら、改修しhooksQueryに移動
 * */
export const useFilteredContracts = () => {
/* URLのParamsを監視し、フィルター条件を再設定する。 */

  return useEstimates({
    select: (d) => {
      return d.filter(({ envStatus }) => {

        return (envStatus.value as TEnvelopeStatus) === 'completed';
      },
      );
    },
  });

};