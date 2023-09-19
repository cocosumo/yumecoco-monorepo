import { getAllProjects } from "api-kintone"
import { IProjects } from "types";

export const groupByProjType = (projects: IProjects[]) => {


    let groupProjType = Object.create(null);
   

    for (let i = 0; i < projects.length; i ++) {
        const projTypeValue = projects[i].projTypeName.value;


        if (!groupProjType[projTypeValue]) { 
            groupProjType = {
                ...groupProjType,
                [projTypeValue]:[projects[i]]
            }
            console.log('projTypeValue', projTypeValue);

        } else {
            groupProjType[projTypeValue].push(projects[i]);
        }
    }

    console.log(groupProjType);
    return groupProjType;
}
