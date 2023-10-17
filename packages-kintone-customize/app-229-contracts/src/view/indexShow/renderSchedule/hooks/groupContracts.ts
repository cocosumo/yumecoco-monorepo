import { projTypeIds } from '../config';
import { TForm } from '../schema';

export interface GroupedContracts {
  [month: string]: {
    totalAmtExclTax: number,
    data: {
      [projTypeId: string]: {
        data: DB.SavedRecord[],
        totalContractAmtExclTax: number,
      },
    }

  }
}


export const groupContracts = (contractRecs: DB.SavedRecord[], territory: TForm['territory']) => {

  return contractRecs.reduce((acc, cur) => {
   
    const month = cur.contractMonth.value;
    const projTypeId = cur.projTypeId.value;

    if (territory !== '全店舗' && territory !== cur.territory.value) return acc;

    const isIncluded = projTypeIds.includes(projTypeId);

    const resolvedProjTypeIdKey = isIncluded ? projTypeId : 'その他';

    if (!acc[month]) {
      acc[month] = {
        totalAmtExclTax: 0,
        data: {},
      };
    }

    if (!acc[month].data[resolvedProjTypeIdKey]) {
      acc[month].data[resolvedProjTypeIdKey] = {
        data: [],
        totalContractAmtExclTax: 0,
      };
    }

    acc[month].data[resolvedProjTypeIdKey].data.push(cur);
    acc[month].data[resolvedProjTypeIdKey].totalContractAmtExclTax += +cur.contractAmountNotax.value;
    acc[month].totalAmtExclTax += +cur.contractAmountNotax.value;

    return acc;


  }, {} as GroupedContracts);
  
};