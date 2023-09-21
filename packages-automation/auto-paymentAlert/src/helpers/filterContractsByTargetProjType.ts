import { getAllContracts } from 'api-kintone';
import { tgtProjType } from '../../config';

/**
 * 契約書を取得し、対象の工事種別のみに絞り込みます
 */
export const filterContractsByTargetProjType = async () => {
  const projTypeQueries = tgtProjType.map((projType) => {
    return `projType = "${projType}"`;
  }).join(' or ');

  return (getAllContracts({
    condition: `contractType = "契約" and (${projTypeQueries})`,
  }));
};
