import {
  getAndpadPaymentsBySystemId,
  getContractsByProjId,
  getCustGroupById,
  getProjById,
  getProjTypeById,
  getStoreByStoreCode,
} from 'api-kintone';
import { calcProfitability } from 'api-kintone/src/andpadProcurement/calculation/calcProfitability';
import { getMonthlyProcurementBySystemId, getOrderByProjId } from 'api-andpad';
import { getAgentNamesByType as custGetAgentsNamesByType } from 'api-kintone/src/custgroups/helpers/getAgentNamesByType';
import { getAgentNamesByType as projGetAgentNamesByType } from 'api-kintone/src/projects/helpers/getAgentNamesByType';
import type { GetCostMgtData } from 'types';
import { convertMonthlyProcurement } from './helpers/convertMonthlyProcurement';
import { formatDataId } from 'libs';



/**
 * 必要なファイルを取得する
 * プロジェクトIDを渡されたら、原価管理表を生成するためのデータを取得し、
 * データを成形する(簡単な形に)
 * 
 * セッションでAPIをアクセス
 * @deprecated replaced with getCostMgtDataByProjIdV3
 */
export const getCostMgtDataByProjIdV2 = async (
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

  const andpadSystemId = String(forceLinkedAndpadSystemId?.value || (await getOrderByProjId(projId))?.システムID || '');

  console.log(andpadSystemId);

  if (!andpadSystemId) return null; // andpadシステムIDがない場合は、原価管理表データを取得しない

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


  const andpadProcurements = await getMonthlyProcurementBySystemId(andpadSystemId); // andpad発注情報
  const costManagemenList = convertMonthlyProcurement(andpadProcurements); // 発注会社ごとに整形したデータ

  const {
    months,
    maxPaymentDate,
    minPaymentDate,
  } = costManagemenList;

  // 取得したデータを整形する

  /** 入金 */
  const depositAmount = (await getAndpadPaymentsBySystemId(andpadSystemId)) // andpad入金情報：入金額総額
    .reduce((acc, { paymentAmount }) => {
      return acc + +paymentAmount.value;
    }, 0);

  const contracts = (await getContractsByProjId(projId))
    .reduce((acc, {
      contractType,
      totalContractAmt,
      tax,
      hasRefund,
      hasSubsidy,
    }) => {
      if (contractType.value === '契約' || contractType.value === '') {
        return {
          ...acc,
          契約金額: acc?.契約金額 + +totalContractAmt.value,
          税率: +tax.value,
          返金: hasRefund.value === 'はい' ? true : false,
          補助金: hasSubsidy.value === 'はい' ? true : false,
        };
      } else if (contractType.value === '追加') {
        return {
          ...acc,
          追加金額: acc.追加金額 + +totalContractAmt.value,
          返金: acc?.返金 || hasRefund.value === 'はい' ? true : false,
          補助金: acc?.補助金 || hasSubsidy.value === 'はい' ? true : false,
        };
      }
    }, {
      契約金額: 0,
      追加金額: 0,
      税率: 0.1,
      返金: false,
      補助金: false,
    });


  const {
    orderAmountBeforeTax,
    additionalAmountBeforeTax,
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
    利益税抜_夢てつ,
    利益税抜_ここすも,
    受注額計_税込,
    受注額計_税抜,
    入金額,
    未入金,
  } = calcProfitability({
    orderAmountAfterTax: contracts?.契約金額 ?? 0,
    additionalAmountAfterTax: contracts?.追加金額 ?? 0,
    purchaseAmount: costManagemenList.totalPlannedBudgetCost,
    paymentAmount: costManagemenList.totalContractOrderCost,
    depositAmount: depositAmount,
    yumeCommFeeRate: +yumeCommFeeRate.value,
    tax: contracts?.税率 ?? 0.1,
    hasRefund: contracts?.返金 ?? false,
  });

  const formatProjNum = formatDataId(projDataId.value);
  const { storeNameShort } = await getStoreByStoreCode(formatProjNum.split('-')[0]);

  const result: GetCostMgtData = {
    projNumJa: `${storeNameShort.value} ${formatProjNum.split('-')[1]}`,
    projNum: formatProjNum,
    projName: projName.value,
    projId: projId,
    andpadSystemId: andpadSystemId,
    custGroupName: custNames.value,
    受注金額_税抜: orderAmountBeforeTax,
    追加金額_税抜: additionalAmountBeforeTax,
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
    利益税抜_夢てつ: 利益税抜_夢てつ,
    利益税抜_ここすも: 利益税抜_ここすも,
    受注額計_税込: 受注額計_税込,
    受注額計_税抜: 受注額計_税抜,
    入金額: 入金額,
    未入金: 未入金,
    夢てつ営業: yumeAGNames,
    ここすも営業: cocoAgNames,
    ここすも工事: cocoConstNames,
    発注情報詳細: costManagemenList.result,
    maxPaymentDate,
    minPaymentDate,
    months,
  };

  return result;
};