import { getAllContracts } from 'api-kintone';
import { tgtProjType } from '../../config';

/**
 * 契約書を取得し、対象の工事種別のみに絞り込みます
 */
export const filterContractsByTargetProjType = async () => {
  return (await getAllContracts())
    .filter(({
      projType,
      contractType,
    }) => {
      return (contractType.value === '契約')
        && (tgtProjType.includes(projType.value as typeof tgtProjType[number]));
    });
};
