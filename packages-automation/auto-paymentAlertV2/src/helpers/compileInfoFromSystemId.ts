import { IAndpadpayments, IContracts, IEmployees, IProjects, IStores, Territory } from 'types';
import { getContractsSummary } from 'api-kintone/src/contracts/getContractsSummary';
import { chatworkRoomIdSetting } from '../notificationFunc/chatworkRoomIdSetting';
import { calcPaymentDate } from './calcPaymentDate';
import { getYumeAgNames } from './getYumeAgNames';



export const compileInfoFromSystemId = ({
  projects,
  contracts,
  stores,
  employees,
  tgtSystemId,
  tgtProjId,
  alertPayment,
}: {
  projects: IProjects[]
  contracts: IContracts[]
  stores: IStores[]
  employees: IEmployees[]
  tgtSystemId: string
  tgtProjId: string
  alertPayment: IAndpadpayments
}) => {

  const {
    expectedPaymentDate,
    作成日時,
  } = alertPayment;

  const hasPaymentHistory = alertPayment.paymentDate.value !== '';

  const tgtProject = projects.find(({
    uuid, //projId
    forceLinkedAndpadSystemId: systemIdForChk,
  }) => {
    return (systemIdForChk.value === tgtSystemId) || (uuid.value === tgtProjId);
  });

  const {
    agents,
    storeCode: storeCodeByProject,
    uuid: projId,
    projName,
    store: storeByProject,
    projTypeName,
  } = tgtProject || {};

  // 対象の契約書情報を取得する
  const tgtContracts = contracts
    .filter(({ projId: contractProjId }) => contractProjId.value === projId?.value) || [];

  // 契約書情報を取得する
  const {
    合計受注金額税込,
  } = getContractsSummary((tgtContracts));

  const mainContract = tgtContracts.find(({ contractType }) => contractType.value === '契約');

  const store = stores.find(({ storeCode }) => storeCode.value === storeCodeByProject?.value);

  // 通知先情報を設定する
  const chatworkRoomIds = chatworkRoomIdSetting({
    agents: agents,
    employees: employees,
  });

  const paymentDate = calcPaymentDate({
    expectedPaymentDate: expectedPaymentDate.value,
    createDate: 作成日時.value,
  });

  const yumeAGs = getYumeAgNames({
    agents: agents,
  });

  return ({
    connectedToAndpad: !!tgtProject,
    hasPaymentHistory: hasPaymentHistory,
    andpadPaymentUrl: `https://andpad.jp/manager/my/orders/${tgtSystemId}/customer_agreement`,
    contractId: tgtContracts.map(({ uuid }) => uuid.value).join(', ') || '取得に失敗しました',
    projId: projId?.value || '取得に失敗しました',
    projName: projName?.value || '取得に失敗しました',
    projType: projTypeName?.value || '取得に失敗しました',
    storeName: store?.officialStoreName.value || storeByProject?.value || '取得に失敗しました',
    contractDate: mainContract?.contractDate.value || '',
    totalContractAmount: 合計受注金額税込.toString() || '取得に失敗しました',
    territory: store?.territory.value as Territory,
    expectedPaymentDate: paymentDate,
    yumeAG: yumeAGs || '取得に失敗しました',
    cwRoomIds: chatworkRoomIds,
  });

};
