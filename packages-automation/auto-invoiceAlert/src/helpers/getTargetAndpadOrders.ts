import { SaveProjectData, getMyOrders } from 'api-andpad';
import { IContracts, IProjects } from 'types';



export type GetTargetAndpadOrders = Awaited<ReturnType<typeof getTargetAndpadOrders>>;

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
  const tgtProjects = projects.filter(({ uuid }) => {
    return contracts.find(({ projId }) => uuid.value === projId.value);
  });

  const tgtOrders = tgtProjects.filter(({ forceLinkedAndpadSystemId }) => forceLinkedAndpadSystemId.value !== '');
  const consoleOrders = tgtOrders.map(({ projName }) => projName.value);
  console.log('tgtSystemIds', tgtOrders.length, consoleOrders);


  const queyForce = tgtOrders.map(({ forceLinkedAndpadSystemId }) => `システムID = ${forceLinkedAndpadSystemId.value}`);
  console.log('queyForce', queyForce);

  // 通常接続と強制接続の案件をまとめる
  let orders = normalOrders.data.objects;
  if (queyForce.length !== 0) {

    const forceOrders = await getMyOrders({
      q: queyForce.join(' OR '),
      limit: queyForce.length,
      series: [additionalProperty],
    });
    console.log('forceOrders', JSON.stringify(forceOrders.data.objects, null, 2));

    orders = normalOrders.data.objects.concat(forceOrders.data.objects);
  }

  return orders;

};
