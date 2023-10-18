import { projTypeIds } from '../config';
import { TForm } from '../schema';

export interface DataByProjType {
  data: DB.SavedRecord[],
  totalContractAmtExclTax: number,
}
export interface MonthlyData {
  [month: string]: {
    totalAmtExclTax: number,
    data: {
      [projTypeId: string]: DataByProjType,
    }
  }
}

export interface GroupedContracts {
  [fiscalYear : string]: {
    monthlyData: MonthlyData,
    totalsByProjType: DataByProjType,
    totalAmtExclTax: number,
  }
}


export const groupContracts = ({
  contractRecs,
  territory,
}:{
  contractRecs: DB.SavedRecord[] | undefined, 
  territory: TForm['territory'],
}) => {

  if (!contractRecs) return null;

  return contractRecs.reduce((acc, cur) => {
    const fiscalYear = parseInt(cur.年度.value); 
    const month = cur.contractMonth.value;
    const projTypeId = cur.projTypeId.value;

    if (territory !== '全店舗' && territory !== cur.territory.value) return acc;

    const isIncluded = projTypeIds.includes(projTypeId);
    const parsedContractAmtExclTax = parseInt(cur.contractAmountNotax.value);
    const resolvedProjTypeIdKey = isIncluded ? projTypeId : 'その他';

    if (!acc[fiscalYear]) {
      acc[fiscalYear] = {
        monthlyData: {
          [month]: {
            totalAmtExclTax: parsedContractAmtExclTax,
            data: {
              [resolvedProjTypeIdKey]: {
                data: [cur],
                totalContractAmtExclTax: parsedContractAmtExclTax,
              },
            },
          },
        },
        totalsByProjType: {
          data: [cur],
          totalContractAmtExclTax: parsedContractAmtExclTax,
        },
        totalAmtExclTax: parsedContractAmtExclTax,
      };
    }

    if (!acc[fiscalYear].monthlyData[month]) {
      acc[fiscalYear].monthlyData[month] = {
        totalAmtExclTax: parsedContractAmtExclTax,
        data: {
          [resolvedProjTypeIdKey]: {
            data: [cur],
            totalContractAmtExclTax: parsedContractAmtExclTax,
          },
        },
      };
    }

    if (!acc[fiscalYear].monthlyData[month].data[resolvedProjTypeIdKey]) {
      acc[fiscalYear].monthlyData[month].data[resolvedProjTypeIdKey] = {
        data: [cur],
        totalContractAmtExclTax: parsedContractAmtExclTax,
      };
    }

    acc[fiscalYear].monthlyData[month].data[resolvedProjTypeIdKey].data.push(cur);
    acc[fiscalYear].monthlyData[month].data[resolvedProjTypeIdKey].totalContractAmtExclTax += parsedContractAmtExclTax;
    acc[fiscalYear].monthlyData[month].totalAmtExclTax += parsedContractAmtExclTax;
    acc[fiscalYear].totalsByProjType.data.push(cur);
    acc[fiscalYear].totalsByProjType.totalContractAmtExclTax += parsedContractAmtExclTax;
    acc[fiscalYear].totalAmtExclTax += parsedContractAmtExclTax;

    

    return acc;

  }, {} as GroupedContracts);
  
};