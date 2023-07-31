import { getAndpadOrdersByAndpadProjId } from 'api-kintone/src/andpadOrders/getAndpadOrdersByAndpadProjId';
import { summarizeOrderingCompanyInfo } from './summarizeOrderingCompanyInfo';
import { getAndpadPaymentsBySystemId, getProjById, getProjTypeById } from 'api-kintone';



/**
 * 必要なファイルを取得する
 * プロジェクトIDを渡されたら、原価管理表を生成するためのデータを取得し、
 * データを成形する(簡単な形に)
 */
export const getCostManagement = async (
  projId: string,
  andpadProjId: string,
  andpadOrders: Awaited<ReturnType<typeof getAndpadOrdersByAndpadProjId>>,
) => {

  // 取得したデータを整形する
  console.log('andpadOrders', andpadOrders);

  /* ここで処理で使用する全データを整形すること！(formを作るイメージ) */

  const projInfo = await getProjById(projId);
  const depositAmount = (await getAndpadPaymentsBySystemId(+andpadProjId))
    .reduce((acc, { paymentAmount }) => {
      return acc + +paymentAmount;
    }, 0);
  const projType = await getProjTypeById(projInfo.projTypeId.value);
  const costManagemenList = summarizeOrderingCompanyInfo(andpadOrders); // 発注会社ごとに整形したデータ

  /* const profitability = calcProfitability({
    orderAmount: costManagemenList.受注金額_税抜,
    additionalAmount: costManagemenList.追加金額_税抜,
    purchaseAmount: costManagemenList.発注金額_税抜,
    paymentAmount: costManagemenList.支払金額_税抜,
  }); */ // TODO


  return ({
    projNum: projInfo.dataId.value,
    projName: projInfo.projName.value,
    custGroupName: projInfo.custNames.value,
    受注金額_税抜: 20636364,
    追加金額_税抜: 1363636,
    発注金額_税抜: costManagemenList.発注金額_税抜,
    支払金額_税抜: costManagemenList.支払金額_税抜,
    予定利益: 27.09, // % (受注金額+追加金額-発注金額)/(受注金額+追加金額)*100
    実利益: 27.09, // % (受注金額+追加金額-支払金額)/(受注金額+追加金額)*100
    利益配分_夢てつ: projType.数値_0.value,
    利益配分_ここすも: 100 - +projType.数値_0.value,
    実利益税抜_夢てつ: 1132182, // (受注金額+追加金額-発注金額)*(利益配分/100)
    実利益税抜_ここすも: 4826671, // (受注金額+追加金額-発注金額)-実利益税抜_夢てつ
    受注額計_税込: 24200000, // (受注金額+追加金額)*税率
    受注額計_税抜: 22000000, // (受注金額+追加金額)
    入金額: depositAmount,
    未入金: 0, // 受注額計_税込 - 入金額
    夢てつ営業: projInfo.yumeAGNames.value,
    ここすも営業: projInfo.cocoAGNames.value,
    ここすも工事: projInfo.cocoConstNames.value,
    発注情報詳細: costManagemenList,
  });
};
