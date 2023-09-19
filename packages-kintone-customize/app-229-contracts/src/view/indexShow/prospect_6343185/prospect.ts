import { getGroupByStore } from "./getGroupByStore";
import { groupByProjType } from "./groupByProjType";


export const prospect = async () => {
    console.log("見込み一覧、開始しました");

    const groupStore = await getGroupByStore();

    console.log(groupStore);

    for(const [storeName, projects] of Object.entries(groupStore)) {
        console.log(storeName, projects);

        const gbProjType = groupByProjType(projects as any);

        console.log(gbProjType);

        
    }
}