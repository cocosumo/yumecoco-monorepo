import {
  getAndpadPaymentsBySystemId,
  getAndpadProcurementByAndpadProjId,
  getContractsByProjId,
  getCustGroupById,
  getEmployees,
  getProjById,
  getProjTypeById,
  getStoreById,
} from 'api-kintone';
import { calcProfitability } from 'api-kintone/src/andpadProcurement/calculation/calcProfitability';
import { getBudgetBySystemId, getOrderByProjId } from 'api-andpad';
import { getAgentNamesByType as custGetAgentsNamesByType } from 'api-kintone/src/custgroups/helpers/getAgentNamesByType';
import { getAgentNamesByType as projGetAgentNamesByType } from 'api-kintone/src/projects/helpers/getAgentNamesByType';
import type { GetCostMgtData } from 'types';
import { formatDataId } from 'libs';
import { convertMonthlyProcurementV3 } from './helpers/convertMonthlyProcurementV3';
import { resolveCommisionRate } from './resolveCommissionRate';

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
    custNames,
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

  if (!andpadSystemId) return null; // andpadシステムIDがない場合は、原価管理表データを取得しない

  const custGroupRec = await getCustGroupById(custGroupId.value);
  const { agents: custGroupAgents } = custGroupRec;

  const projTypeRec = await getProjTypeById(projTypeId.value); // 工事種別

  // 古い工事情報データにはcocoAGとyumeAGの記入はないので、顧客グループのデータから取得
  const cocoAgNames =
    projGetAgentNamesByType(projAgents, 'cocoAG') ||
    custGetAgentsNamesByType(custGroupAgents, 'cocoAG');
  const yumeAGNames =
    projGetAgentNamesByType(projAgents, 'yumeAG') ||
    custGetAgentsNamesByType(custGroupAgents, 'yumeAG');
  const cocoConstNames = projGetAgentNamesByType(projAgents, 'cocoConst');


  const andpadBudgetExecution = await getBudgetBySystemId(andpadSystemId); // 実行予算
  const andpadProcurements =
    await getAndpadProcurementByAndpadProjId(andpadSystemId); // 発注実績

  // 発注会社ごとにデータを整形する
  console.log('Converting andpadbudgets');
  const costManagemenList = convertMonthlyProcurementV3(
    andpadBudgetExecution,
    andpadProcurements,
  );

  const { months, maxPaymentDate, minPaymentDate } = costManagemenList;

  console.log('Retrieving Payment Data...');
  /** 入金 */
  const depositAmount = (await getAndpadPaymentsBySystemId(andpadSystemId)) // andpad入金情報：入金額総額
    .reduce((acc, { paymentAmount }) => {
      return acc + +paymentAmount.value;
    }, 0);

  console.log('Retrieving Contracts Data...');
  const contracts = (await getContractsByProjId(projId)).reduce(
    (
      acc,
      {
        contractType,
        totalContractAmt,
        tax,

        hasRefund,
        refundAmt,

        hasReduction,
        reductionAmt,

        hasSubsidy,
        subsidyAmt,
      },
    ) => {
      const newAcc = { ...acc };

      if (
        contractType.value === '契約' ||
        contractType.value === '' // 古いデータには契約タイプがないので、空文字の場合も契約とみなす
      ) {
        newAcc.契約金額 += +totalContractAmt.value;
      } else if (contractType.value === '追加') {
        newAcc.追加金額 += +totalContractAmt.value;
      }

      // 返金がある場合は、返金フラグをtrueにする
      newAcc.返金 = newAcc.返金 || hasRefund.value === 'はい' ? true : false;

      newAcc.税率 = +tax.value;
      newAcc.補助金Amt += hasSubsidy.value === 'はい' ? +subsidyAmt.value : 0;

      // K165で追加金額に返金と減額を含めるようになったが、「返金」「減額」も表示する依頼がくるかもしれないので、
      // 別々のプロパティにする
      newAcc.減額Amt += hasReduction.value === 'はい' ? +reductionAmt.value : 0;
      newAcc.返金Amt += hasRefund.value === 'はい' ? +refundAmt.value : 0;

      return newAcc;
    },
    {
      契約金額: 0,
      追加金額: 0,
      税率: 0.1,
      返金: false,
      減額Amt: 0,
      返金Amt: 0,
      補助金Amt: 0,
    },
  );

  const employeesRec = await getEmployees(false);
  const resolvedCommRate = resolveCommisionRate({
    custGroupRec,
    projRec,
    projTypeRec,
    empRecs: employeesRec,
  });

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
    orderAmountAfterTax: contracts?.契約金額 ?? 0,
    additionalAmountAfterTax:
      contracts.追加金額 - (contracts.返金Amt + contracts.減額Amt),
    purchaseAmount: costManagemenList.totalContractOrderCost,
    paymentAmount: costManagemenList.totalPaidAmount,
    depositAmount: depositAmount,
    yumeCommFeeRate: resolvedCommRate,
    tax: contracts?.税率 ?? 0.1,
    hasRefund: contracts?.返金 ?? false,
    subsidyAmt: contracts?.補助金Amt ?? 0,
  });

  const formatProjNum = formatDataId(projDataId.value);
  const { storeNameShort } = await getStoreById(storeId.value);

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
    発注情報詳細: costManagemenList.result,
    maxPaymentDate,
    minPaymentDate,
    months,
  };

  return result;
};
