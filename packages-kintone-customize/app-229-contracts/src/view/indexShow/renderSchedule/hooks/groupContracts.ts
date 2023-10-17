import { projTypeIds } from '../config';

export interface GroupedContracts {
  [month: string]: {
    [projTypeId: string]: {
      data: DB.SavedRecord[],
      totalContractAmtExclTax: number,
    },
  }
}


export const groupContracts = (contractRecs: DB.SavedRecord[]) => {

  return contractRecs.reduce((acc, cur) => {
    const month = cur.contractMonth.value;
    const projTypeId = cur.projTypeId.value;

    const isIncluded = projTypeIds.includes(projTypeId);

    const resolvedProjTypeIdKey = isIncluded ? projTypeId : 'その他';

    if (!acc[month]) {
      acc[month] = {};
    }

    if (!acc[month][resolvedProjTypeIdKey]) {
      acc[month][resolvedProjTypeIdKey] = {
        data: [],
        totalContractAmtExclTax: 0,
      };
    }

    acc[month][resolvedProjTypeIdKey].data.push(cur);

    acc[month][resolvedProjTypeIdKey].totalContractAmtExclTax += +cur.contractAmountNotax.value;

    return acc;


  }, {} as GroupedContracts);
  
};