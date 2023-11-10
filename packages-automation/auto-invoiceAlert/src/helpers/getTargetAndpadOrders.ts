import { SaveProjectData, getMyOrders, getOrderBySystemId } from 'api-andpad';
import { IContracts, IProjects } from 'types';



export type GetTargetAndpadOrders = Awaited<ReturnType<typeof getTargetAndpadOrders>>;

/**
 * 対象の契約書及びシステムIDの物のみANDPADの案件を取得する
 * @param param0 
 * @returns 
 * @deprecated ループ内でasync/awaitのループが発生してしまうため
 */
export const getTargetAndpadOrders = async ({
  contracts,
  projects,
}: {
  contracts: IContracts[]
  projects: IProjects[]
}) => {

  // 契約書に記載の工事番号から取得する(対象：通常接続の案件)
  const queyProjcts = contracts.map(({ projId }) => `案件管理ID = ${projId.value}`).join(' OR ');
  //console.log('query check', queyProjcts);

  const additionalProperty: keyof SaveProjectData = '案件フロー';
  const normalOrders = await getMyOrders({ q: queyProjcts, series: [additionalProperty] });

  console.log(`ANDPAD案件一覧: ${normalOrders.data.objects.length}件: ${JSON.stringify(normalOrders.data.objects, null, 2)}`);



  // 工事情報から強制接続しているシステムIDで取得する(対象：強制接続の案件)
  const tgtProjects = projects.filter(({ uuid }) => {
    return contracts.find(({ projId }) => uuid.value === projId.value);
  });

  const forceLinkedProjects = tgtProjects.filter(({ forceLinkedAndpadSystemId }) => forceLinkedAndpadSystemId.value !== '');
  const consoleOrders = forceLinkedProjects.map(({ projName }) => projName.value);
  console.log('tgtSystemIds', forceLinkedProjects.length, consoleOrders);

  // 通常接続と強制接続の案件をまとめる
  let orders = normalOrders.data.objects;
  if (forceLinkedProjects.length !== 0) {

    // システムIDは検索に利用できないため、1件ずつ取得
    for (const forceLinkedProject of forceLinkedProjects) {
      const forceLinkedOrder = await getOrderBySystemId({
        systemId: forceLinkedProject.forceLinkedAndpadSystemId.value,
        series: [additionalProperty],
      });
      console.log(`forceOrders: systemId=${forceLinkedProject.forceLinkedAndpadSystemId.value},
       ${JSON.stringify(forceLinkedOrder, null, 2)}`);

      orders = orders.concat(forceLinkedOrder.data.object);
    }
  }

  return orders;

};
