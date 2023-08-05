import { CostManagement, summarizeOrderingCompanyInfo } from './summarizeOrderingCompanyInfo';
import { 
  getAndpadPaymentsBySystemId, 
  getAndpadProcurementByAndpadProjId, 
  getContractsByProjId, 
  getCustGroupById, 
  getProjById, 
  getProjTypeById, 
} from 'api-kintone';
import { calcProfitability } from 'api-kintone/src/andpadProcurement/calculation/calcProfitability';
import { getAgentNamesByType as projGetAgentNamesByType } from '../projects/helpers/getAgentNamesByType';
import { getOrderByProjId } from 'api-andpad';
import { getAgentNamesByType as custGetAgentsNamesByType } from '../custgroups/helpers/getAgentNamesByType';


export interface GetCostManagement {
  projNum: string,
  projName: string,
  custGroupName: string,
  受注金額_税抜: number,
  追加金額_税抜: number,
  発注金額_税抜: number,
  支払金額_税抜: number,
  予定利益率: number,
  予定利益額: number,
  実利益率: number,
  実利益額: number,
  利益配分_夢てつ: number,
  利益配分_ここすも: number,
  実利益税抜_夢てつ: number,
  実利益税抜_ここすも: number,
  受注額計_税込: number,
  受注額計_税抜: number,
  入金額: number,
  未入金: number,
  夢てつ営業: string,
  ここすも営業: string,
  ここすも工事: string,
  発注情報詳細: CostManagement,
}

/**
 * 必要なファイルを取得する
 * プロジェクトIDを渡されたら、原価管理表を生成するためのデータを取得し、
 * データを成形する(簡単な形に)
 */
export const getCostMgtData = async (
  projId: string,
) => {

  const {
    dataId: projDataId,
    projName,
    custNames,
    agents: projAgents,
    forceLinkedAndpadSystemId,
    projTypeId,
    custGroupId,
  } = await getProjById(projId);

  const {
    agents: custGroupAgents,
  } = await getCustGroupById(custGroupId.value);

  const {
    yumeCommFeeRate,
  } = await getProjTypeById(projTypeId.value); // 工事種別

  // 古い工事情報データにはcocoAGとyumeAGの記入はないので、顧客グループのデータから取得
  const cocoAgNames = projGetAgentNamesByType(projAgents, 'cocoAG') || custGetAgentsNamesByType(custGroupAgents, 'cocoAG');
  const yumeAGNames = projGetAgentNamesByType(projAgents, 'yumeAG') || custGetAgentsNamesByType(custGroupAgents, 'yumeAG');
  const cocoConstNames = projGetAgentNamesByType(projAgents, 'cocoConst');


  const andpadSystemId = String(forceLinkedAndpadSystemId?.value || (await getOrderByProjId(projId))?.システムID);
  
  if (!andpadSystemId) return null;

  const andpadProcurements = await getAndpadProcurementByAndpadProjId(andpadSystemId); // andpad発注情報
  // 取得したデータを整形する

  const depositAmount = (await getAndpadPaymentsBySystemId(andpadSystemId)) // andpad入金情報：入金額総額
    .reduce((acc, { paymentAmount }) => {
      return acc + +paymentAmount.value;
    }, 0);

  const contracts = (await getContractsByProjId(projId))
    .reduce((acc, {
      contractType,
      totalContractAmt,
      tax,
    }) => {
      if (contractType.value === '契約' || contractType.value === '') {
        return {
          ...acc,
          契約金額: acc?.契約金額 + +totalContractAmt.value,
          税率: +tax.value,
        };
      } else if (contractType.value === '追加') {
        return {
          ...acc,
          追加金額: acc.追加金額 + +totalContractAmt.value,
        };
      }
    }, {
      契約金額: 0,
      追加金額: 0,
      税率: 0.1,
    });

  const costManagemenList = summarizeOrderingCompanyInfo(andpadProcurements); // 発注会社ごとに整形したデータ

  const {
    orderAmount,
    additionalAmount,
    purchaseAmount,
    paymentAmount,
    予定利益率,
    予定利益額,
    実利益率,
    実利益額,
    yumeProfitSharing,
    cocoProfitSharing,
    実利益税抜_夢てつ,
    実利益税抜_ここすも,
    受注額計_税込,
    受注額計_税抜,
    入金額,
    未入金,
  } = calcProfitability({
    orderAmount: contracts?.契約金額 ?? 0,
    additionalAmount: contracts?.追加金額 ?? 0,
    purchaseAmount: costManagemenList.発注金額_税抜,
    paymentAmount: costManagemenList.支払金額_税抜,
    depositAmount: depositAmount,
    yumeCommFeeRate: +yumeCommFeeRate.value,
    tax: contracts?.税率 ?? 0.1,
  });


  const result : GetCostManagement = {
    projNum: projDataId.value,
    projName: projName.value,
    custGroupName: custNames.value,
    受注金額_税抜: orderAmount,
    追加金額_税抜: additionalAmount,
    発注金額_税抜: purchaseAmount,
    支払金額_税抜: paymentAmount,
    予定利益率: 予定利益率,
    予定利益額: 予定利益額,
    実利益率: 実利益率,
    実利益額: 実利益額,
    利益配分_夢てつ: yumeProfitSharing,
    利益配分_ここすも: cocoProfitSharing,
    実利益税抜_夢てつ: 実利益税抜_夢てつ,
    実利益税抜_ここすも: 実利益税抜_ここすも,
    受注額計_税込: 受注額計_税込,
    受注額計_税抜: 受注額計_税抜,
    入金額: 入金額,
    未入金: 未入金,
    夢てつ営業: yumeAGNames,
    ここすも営業: cocoAgNames,
    ここすも工事: cocoConstNames,
    発注情報詳細: costManagemenList,
  };


  return result;
};