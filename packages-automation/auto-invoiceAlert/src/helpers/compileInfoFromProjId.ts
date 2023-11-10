import { GetMyOrdersResponse } from 'api-andpad';
import { IEmployees, IProjects, IStores } from 'types';
import { chatworkRoomIdSetting } from '../notificationFunc/chatworkRoomIdSetting';
import { getYumeAgNames } from './getYumeAgNames';


export type CompileInfoFromProjId = ReturnType<typeof compileInfoFromProjId>;

export const compileInfoFromProjId = ({
  projId,
  projects,
  allOrders,
  stores,
  employees,
}: {
  projId: string
  projects: IProjects[]
  allOrders: GetMyOrdersResponse
  stores: IStores[]
  employees: IEmployees[]
}) => {

  // 通知対象者を抽出する
  const {
    agents,
    storeCode: storeCodeByProjct,
    forceLinkedAndpadSystemId,
  } = projects.find(({ uuid }) => uuid.value === projId) || {};

  // システムIDを取得する
  const andpadProject = allOrders.data.objects.find(({ 案件管理ID }) => 案件管理ID === projId);

  const andpadSystemId = String(forceLinkedAndpadSystemId?.value)
    || andpadProject?.システムID?.toString();

  const andpadInvoiceUrl = andpadSystemId ?
    `https://andpad.jp/manager/my/orders/${andpadSystemId}/customer_agreement`
    : undefined;

  // andpadと接続されていない案件と、失注の案件は除外する
  let conectedToAndpad = true;
  if (!andpadInvoiceUrl || andpadProject?.案件フロー === '失注') conectedToAndpad = false;

  const store = stores.find(({ storeCode }) => storeCode.value === storeCodeByProjct?.value);

  const chatworkRoomIds = chatworkRoomIdSetting({
    agents: agents,
    employees: employees,
  });

  const yumeAGs = getYumeAgNames({
    agents: agents,
  });

  return {
    conectedToAndpad: conectedToAndpad,
    systemId: andpadSystemId,
    andpadInvoiceUrl: andpadInvoiceUrl,
    territory: store?.territory.value ?? '',
    storeName: store?.officialStoreName.value,
    chatworkRoomIds: chatworkRoomIds,
    yumeAGs: yumeAGs,
  };
};
