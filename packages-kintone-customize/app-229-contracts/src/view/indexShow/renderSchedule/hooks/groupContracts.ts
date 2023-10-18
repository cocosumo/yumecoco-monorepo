import { projTypeIds } from '../config';
import { TForm } from '../schema';

export interface DataByProjType {
  data: DB.SavedRecord[],
  totalAmtExclTax: number,
}


export interface MonthlyData {
  [month: string]: {
    totalAmtExclTax: number,
    contractsByType: Record<string, DataByProjType>
    contracts: DB.SavedRecord[],
  }
}

export interface YearlyData {
  monthlyData: MonthlyData,
  contractsByType: Record<string, DataByProjType>
  contracts: DB.SavedRecord[],
  totalAmtExclTax: number,
}

export interface GroupedContracts {
  [fiscalYear : string]: YearlyData
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

    const isOthers = !projTypeIds.includes(projTypeId);
    const parsedContractAmtExclTax = parseInt(cur.contractAmountNotax.value ?? '0');
    const resolvedProjTypeIdKey = isOthers ? 'その他' : projTypeId ;

    const yearlyData = acc[fiscalYear] ?? {
      monthlyData: {},
      contractsByType: {},
      contracts: [],
      totalAmtExclTax: 0,
    };

    const monthlyData = yearlyData.monthlyData[month] ?? {
      totalAmtExclTax: 0,
      contractsByType: {},
      contracts: [],
    };

    const contractsByType = monthlyData.contractsByType[resolvedProjTypeIdKey] ?? {
      data: [],
      totalAmtExclTax: 0,
    };

    const contracts = monthlyData.contracts;

    contracts.push(cur);

    contractsByType.data.push(cur);

    contractsByType.totalAmtExclTax += parsedContractAmtExclTax;

    monthlyData.totalAmtExclTax += parsedContractAmtExclTax;

    monthlyData.contractsByType[resolvedProjTypeIdKey] = contractsByType;

    monthlyData.contracts = contracts;

    yearlyData.monthlyData[month] = monthlyData;

    yearlyData.contracts.push(cur);

    yearlyData.contractsByType[resolvedProjTypeIdKey] = contractsByType;

    yearlyData.totalAmtExclTax += parsedContractAmtExclTax;

    acc[fiscalYear] = yearlyData;


    return acc;
   


  }, {} as GroupedContracts);
  
};