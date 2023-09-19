import { getAllProjects, getAllRecords } from "api-kintone"
import { appId } from "../../../constants";

export const getGroupByStore = async () => {

    const stores = await getAllProjects();
    const contracts = await getAllRecords({app: appId,condition: 'projectId !=""'})as any;
    console.log(contracts);
    console.log(stores);

    let groupStore = Object.create(null);
   

    for (let i = 0; i < stores.length; i ++) {
        const storeValue = stores[i].store.value;

        const hasContract = contracts.some(({projectId}) => {
            return projectId.value === stores[i].uuid.value;

        });

        if (hasContract) {
            continue;
        }

        if (!groupStore[storeValue]) { 
            groupStore = {
                ...groupStore,
                [storeValue]:[stores[i]]
            }
            console.log('projTypeValue', storeValue);

        } else {
            groupStore[storeValue].push(stores[i]);
        }
    }

    console.log(groupStore);
    return groupStore;
}
