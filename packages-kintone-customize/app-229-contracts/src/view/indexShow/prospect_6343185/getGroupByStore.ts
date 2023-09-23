import { getAllProjects, getAllRecords } from "api-kintone"
import { appId } from "../../../constants";
import { getCachedStores } from "../../../../jsedit/api/getCachedStores";

export const getGroupByStore = async () => {

    //const stores = await getAllProjects();
    const contracts = await getAllRecords({app: appId,condition: 'projectId !=""'})as any;
    const projProspect = await getAllRecords({app: 209, condition: 'rank !=""'})as any;
    //console.log(contracts);
    console.log(projProspect);

    const stores = await getCachedStores();

    let groupStore = Object.create(null);
        
    for(const s of stores) {
        groupStore[s.店舗名.value] = [];
    }
   

    for (let i = 0; i < projProspect.length; i ++) {
        const pp = projProspect[i];
        const storeValue = pp.store.value;
                
        const hasContract = contracts.some(({projectId}: any) => {
           return projectId.value === pp.uuid.value;
        });
        //console.log('hasContract', stores[i].custNames.value, hasContract);

        if (hasContract) {
            continue;
        }

        if(pp.cancelStatus.value !== "") {
            continue;
        } 

        if (!groupStore[storeValue]) { 
            groupStore = {
                ...groupStore,
                [storeValue]:[pp]
            }
            //console.log('projTypeValue', storeValue);

        } else {
            groupStore[storeValue].push(pp);
        }
    }

    //console.log(groupStore);
    return groupStore;
}
