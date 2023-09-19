import { getAllProjects, getAllRecords } from "api-kintone"
import { AppIds } from "config";
import { appId } from "../../../constants";

export const getProjectGroupByStores = async () => {
    
    const projects = await getAllProjects();
    //console.log(projects);

    const contracts = await getAllRecords({app: appId,condition: 'projectId != ""'});
    //console.log(contracts);

    const result = Object.create(null);

    for(const p of projects) {
        const storeName = p.store.value;
        const hasContract = contracts.some((c: any) => {
           return c.projectId.value === p.uuid.value;
        })

        if(hasContract) {
            continue;
        }

        if(result[storeName]) {
            result[storeName].push(p);
        } else {
            result[storeName] = [p];
        }
    }

    console.log(result);
    return result;

}