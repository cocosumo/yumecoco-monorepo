import {
  getAndpadPaymentsBySystemId,
  getContractsByProjId,
  getCustGroupById,
  getEmployees,
  getProjById,
  getProjTypeById,
  getStoreById,
} from 'api-kintone';
import { calcProfitability } from 'api-kintone/src/andpadProcurement/calculation/calcProfitability';
import { getOrderByProjId } from 'api-andpad';
import { getAgentNamesByType as custGetAgentsNamesByType } from 'api-kintone/src/custgroups/helpers/getAgentNamesByType';
import { getAgentNamesByType as projGetAgentNamesByType } from 'api-kintone/src/projects/helpers/getAgentNamesByType';
import type { GetCostMgtData } from 'types';
import { formatDataId, resolveCommisionRate } from 'libs';
import { getContractsSummary } from 'api-kintone/src/contracts/getContractsSummary';
import { convertMonthlyProcurementV4 } from './helpers/convertMonthlyProcurementV4';
import { getAndpadProcurementsBySytemId } from 'api-andpad/src/@get/getAndpadProcurementsBySytemId';

/**
 * 必要なファイルを取得する
 * プロジェクトIDを渡されたら、原価管理表を生成するためのデータを取得し、
 * データを成形する(簡単な形に)
 *
 * セッションでAPIをアクセス + kintoneから実績取得
 */
export const getCostMgtDataByProjIdV4 = async (projId: string) => {
  const projRec = await getProjById(projId);

  const {
    dataId: projDataId,
    projName,
    agents: projAgents,
    forceLinkedAndpadSystemId,
    projTypeId,
    custGroupId,
    storeId,
  } = projRec;

  const andpadSystemId = String(
    forceLinkedAndpadSystemId?.value ||
    (await getOrderByProjId(projId))?.システムID ||
    '',
  );

  console.log(andpadSystemId);

  //if (!andpadSystemId) return null; // andpadシステムIDがない場合は、原価管理表データを取得しない

  const [
    custGroupRec,
    projTypeRec,
    employeesRec,
    //andpadBudgetExecution, // 実行予算
    andpadProcurements,
    andpadPayments, // andpad入金情報：入金額総額
    contractRecs, // 契約情報
  ] = await Promise.all([
    getCustGroupById(custGroupId.value),
    getProjTypeById(projTypeId.value),
    getEmployees(false),
    //getBudgetBySystemId(andpadSystemId),
    //getAndpadProcurementByAndpadProjId(andpadSystemId),
    getAndpadProcurementsBySytemId(andpadSystemId),
    getAndpadPaymentsBySystemId(andpadSystemId),
    getContractsByProjId(projId),
  ]);



  const {
    agents: custGroupAgents,
    storeId: custGroupStoreId,
    members: members,
  } = custGroupRec;

  const custNames = members.value.map(({ value }) => value.customerName.value).join('、');

  const resolvedCommRate = resolveCommisionRate({
    custGroupRec,
    projRec,
    projTypeRec,
    empRecs: employeesRec,
  });

  // 工事データの店舗を保持できるように、顧客グループのルークアップに、店舗IDをコピーしないようにしました。
  // 移行の間、店舗IDがない工事データが出てきますので、ここでフォールバックを設ける
  const storeRec = await getStoreById(storeId.value || custGroupStoreId.value);

  // 古い工事情報データにはcocoAGとyumeAGの記入はないので、顧客グループのデータから取得
  const cocoAgNames =
    projGetAgentNamesByType(projAgents, 'cocoAG') ||
    custGetAgentsNamesByType(custGroupAgents, 'cocoAG');
  const yumeAGNames =
    projGetAgentNamesByType(projAgents, 'yumeAG') ||
    custGetAgentsNamesByType(custGroupAgents, 'yumeAG');
  const cocoConstNames = projGetAgentNamesByType(projAgents, 'cocoConst');


  // 発注会社ごとにデータを整形する
  console.log('Converting andpadbudgets');

  const costManagemenList = convertMonthlyProcurementV4(
    andpadProcurements.andpadBudget,
    andpadProcurements.procurements,
  );

  const {
    months = [],
    maxPaymentDate = '',
    minPaymentDate = '',
  } = costManagemenList || {};

  console.log('Retrieving Payment Data...');

  /** 入金 */
  const {
    depositAmount,
    depositAmountSubsidy,
  } = andpadPayments // andpad入金情報：入金額総額
    .reduce((acc, { paymentAmount, paymentType }) => {

      acc.depositAmount += +paymentAmount.value;
      
      if (paymentType.value.includes('補助金')) {
        acc.depositAmountSubsidy += +paymentAmount.value;
      }

      return acc;
    }, {
      depositAmount: 0,
      depositAmountSubsidy: 0,
    });

  

  console.log('Retrieving Contracts Data...');
  const contracts = getContractsSummary(contractRecs);


  console.log('Calculating Profitability...');
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
    hasRefund,
    利益税抜_夢てつ,
    利益税抜_ここすも,
    受注額計_税込,
    受注額計_税抜,
    入金額,
    未入金,
    補助金,
  } = calcProfitability({
    orderAmountAfterTax: contracts?.契約金額税込 ?? 0,
    additionalAmountAfterTax: contracts.追加金額税込,
    purchaseAmount: costManagemenList?.totalContractOrderCost ?? 0,
    paymentAmount: costManagemenList?.totalPaidAmount ?? 0,
    depositAmount: depositAmount,
    despositAmountSubsidy: depositAmountSubsidy,
    yumeCommFeeRate: resolvedCommRate,
    tax: contracts?.税率 ?? 0.1,
    hasRefund: contracts?.返金 ?? false,
    subsidyAmt: contracts?.補助金Amt ?? 0,
    contractDate: new Date(contracts.contractDate),
  });

  const formatProjNum = formatDataId(projDataId.value);
  const { storeNameShort } = storeRec;

  const result: GetCostMgtData = {
    projNumJa: `${storeNameShort.value} ${formatProjNum.split('-')[1]}`,
    projNum: formatProjNum,
    projName: projName.value,
    projId: projId,
    andpadSystemId: andpadSystemId,
    custGroupName: custNames,
    受注金額_税抜: orderAmountBeforeTax,
    追加金額_税抜: additionalAmountBeforeTax,
    発注金額_税抜: purchaseAmount,
    支払金額_税抜: paymentAmount,
    予定利益率: 予定利益率,
    予定利益額: 予定利益額,
    実利益率: 実利益率,
    実利益額: 実利益額,
    hasRefund: hasRefund,
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
    補助金: 補助金,
    夢てつ営業: yumeAGNames,
    ここすも営業: cocoAgNames,
    ここすも工事: cocoConstNames,
    発注情報詳細: costManagemenList?.result || [],
    maxPaymentDate: maxPaymentDate,
    minPaymentDate,
    months,
  };

  return result;
};
