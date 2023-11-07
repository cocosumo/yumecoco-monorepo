import { SaveProjectData, getMyOrders } from 'api-andpad';
import { IContracts, IProjects } from 'types';



/**
 * 対象の契約書及びシステムIDの物のみANDPADの案件を取得する
 * @param param0 
 * @returns 
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
  const tgtSystemIds = projects.filter(({ forceLinkedAndpadSystemId, uuid }) => {
    return contracts.find(({ projId }) => {
      if (uuid.value === projId.value) {
        return forceLinkedAndpadSystemId.value !== null;
      }
    });
  });

  let orders = normalOrders.data.objects;

  console.log('tgtSystemIds', tgtSystemIds.length/* , JSON.stringify(tgtSystemIds, null, 2) */);

  const queyForce = tgtSystemIds.map(({ forceLinkedAndpadSystemId }) => {
    `システムID = ${forceLinkedAndpadSystemId.value}`;
  }).join(' OR ');

  console.log('queyForce', queyForce);

  if (queyForce.length !== 0) {

    const forceOrders = await getMyOrders({ q: queyForce, series: [additionalProperty] });
    console.log('forceOrders', forceOrders);

    orders = normalOrders.data.objects.concat(forceOrders.data.objects);
  }

  return orders;

};
