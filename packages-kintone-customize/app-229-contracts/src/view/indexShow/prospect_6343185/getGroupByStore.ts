import { getAllRecords } from 'api-kintone';
import { appId } from '../../../constants';
import { getCachedStores } from '../../../../jsedit/api/getCachedStores';

//店舗ごとの一覧を生成

export const getGroupByStore = async () => {

  //ここすも契約一覧の工事uuidを参照
  const contracts = await getAllRecords({ app: appId, condition: 'projectId !=""' }) as any;
  //【本番用】ココアス工事内容より参照（アプリID：209）
  const projProspect = await getAllRecords({ app: 209, condition: 'rank !=""' }) as any;
  // console.log(contracts);
  // console.log('projProspect', projProspect);

  const stores = await getCachedStores();
  //console.log('stores', stores);
  //生成した一覧をリセット
  //let groupStore = Object.create(null);
  let groupStore: Record<string, any[]> = {};
    
  //店舗ごとに一覧をソート生成
  for (const store of stores) {
    if (!groupStore[store.店舗名.value]) {
      //console.log('groupStore', groupStore);
      groupStore[store.店舗名.value] = [];
      //console.log('ObjectKeys',Object.keys(groupStore));
    }
  }
   
    
  for (let i = 0; i < projProspect.length; i ++) {
    const pp = projProspect[i];
    const storeValue = pp.store.value;
                
    //ここすも契約一覧の工事uuidと工事内容uuidが一致するか参照
    const hasContract = contracts.some(({ projectId }: any) => {
      return projectId.value === pp.uuid.value;
    });

    //契約済になっていた場合（一覧に入れない）
    if (hasContract) {
      continue;
    }

    //工事内容が削除済になっていた場合（一覧に入れない）
    if (pp.cancelStatus.value !== '') {
      continue;
    } 

    //店舗ごとにグループする
    if (!groupStore[storeValue]) { 
      groupStore = {
        ...groupStore,
        [storeValue]:[pp],
      };
      //console.log('projTypeValue', storeValue);

    } else {
      //抱えられる案件をpushで増やす
      groupStore[storeValue].push(pp);
    }
  }

  console.log(groupStore);
  return groupStore;
};
