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
    totalProfit: number,
  }
}

export interface YearlyData {
  monthlyData: MonthlyData,
  contractsByType: Record<string, DataByProjType>
  contracts: DB.SavedRecord[],
  totalAmtExclTax: number,
  totalProfit: number,
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
    const parsedTotalProfit = parseInt(cur.profit.value ?? '0');

    const resolvedProjTypeIdKey = isOthers ? 'その他' : projTypeId ;

    
    if (!acc[fiscalYear]) {
      acc[fiscalYear] = {
        monthlyData: {},
        contractsByType: {},
        contracts: [],
        totalAmtExclTax: 0,
        totalProfit: 0,
      };
    }

    if (!acc[fiscalYear].monthlyData[month]) {
      acc[fiscalYear].monthlyData[month] = {
        contractsByType: {},
        contracts: [],
        totalAmtExclTax: 0,
        totalProfit: 0,
      };
    }

    if (!acc[fiscalYear].contractsByType[resolvedProjTypeIdKey]) {
      acc[fiscalYear].contractsByType[resolvedProjTypeIdKey] = {
        data: [],
        totalAmtExclTax: 0,
      };
    }

    if (!acc[fiscalYear].monthlyData[month].contractsByType[resolvedProjTypeIdKey]) {
      acc[fiscalYear].monthlyData[month].contractsByType[resolvedProjTypeIdKey] = {
        data: [],
        totalAmtExclTax: 0,
      };
    }

    acc[fiscalYear].contracts.push(cur);
    acc[fiscalYear].contractsByType[resolvedProjTypeIdKey].data.push(cur);
    acc[fiscalYear].totalAmtExclTax += parsedContractAmtExclTax;
    acc[fiscalYear].totalProfit += parsedTotalProfit;
    acc[fiscalYear].contractsByType[resolvedProjTypeIdKey].totalAmtExclTax += parsedContractAmtExclTax;

    acc[fiscalYear].monthlyData[month].contracts.push(cur);
    acc[fiscalYear].monthlyData[month].totalAmtExclTax += parsedContractAmtExclTax;
    acc[fiscalYear].monthlyData[month].totalProfit += parsedTotalProfit;
    acc[fiscalYear].monthlyData[month].contractsByType[resolvedProjTypeIdKey].data.push(cur);
    acc[fiscalYear].monthlyData[month].contractsByType[resolvedProjTypeIdKey].totalAmtExclTax += parsedContractAmtExclTax;

    
    return acc;
   


  }, {} as GroupedContracts);
  
};