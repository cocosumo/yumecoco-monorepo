import { useMemo } from 'react';
import {  useFiscalYearData } from './useFiscalYearData';
import { useTypedWatch } from './useTypedRHF';
import { TForm } from '../schema';
import { useContractsByFiscalYear } from './useContractsByFiscalYear';
import { groupContracts } from './groupContracts';


export type Targets = Record<string, {
  yearlyTarget: number,
  monthlyTarget: number,
  projTypeName: string,
}>;

export interface Expenses {
  id: string,
  month: number,
  description: string,
  expense: number,
}

export type ExpensesByMonth = Record<number, {
  expenses: Expenses[],
  totalExpenses: number,
}>;

export type UseTargetDataReturn = ReturnType<typeof useTargetData>;

export const useTargetData = () => {
  const [
    territory,
    fiscalYear,
  ] = useTypedWatch({
    name: [
      'territory',
      'fiscalYear',
    ],
  }) as [
    TForm['territory'],
    TForm['fiscalYear'],
  ];
  const { data, ...others } = useFiscalYearData();
  const { data: contracts } = useContractsByFiscalYear(fiscalYear);


  const fiscalYearData = useMemo(() => {

    const {
      meetingEventTable,
      eastConstractTargetTable,
      eastAnother,
      eastMonthlyAnother,

      westConstractTargetTable,
      westAnother,
      westMonthlyAnother,

      expensesTable,
      expensesTotal,

      adTable,
      adTotal,

    } = data || {};

    console.log('data', data, adTotal);



    /** 月でグループしたイベント */
    const events = meetingEventTable?.value.reduce((acc, cur) => {
      const month = parseInt(cur.value.eventMonth.value);
      if (acc[month]) {
        acc[month].push(cur.value.eventDetails.value);
      } else {
        acc[month] = [cur.value.eventDetails.value];
      }
      return acc;

    }, {} as Record<number, string[]>);

    /***********
     * 東 エリア
     **********/
    const eastTargets = eastConstractTargetTable?.value
      .reduce((acc, cur) => {
        const projTypeId = cur.value.eastProjUuid.value;
        const yearTarget = +cur.value.eastAnnualGoal.value;
        const monthlyTarget = +cur.value.eastMonthlyGoal.value;
        const projTypeName = cur.value.eastProjTypeName.value;

        if (acc[projTypeId]) {
          acc[projTypeId].yearlyTarget += yearTarget;
          acc[projTypeId].monthlyTarget += monthlyTarget;
        } else {
          acc[projTypeId] = {
            yearlyTarget: yearTarget,
            monthlyTarget: monthlyTarget,
            projTypeName: projTypeName,
          };
        }
        return acc;
      }, {} as Targets);

    const eastOthersYearlyTarget = +(eastAnother?.value ?? 0); 
    const eastOthersMonthlyTarget = +(eastMonthlyAnother?.value ?? 0);

    /***********
     * 西 エリア
     **********/
    const westTargets = westConstractTargetTable?.value
      .reduce((acc, cur) => {
        const projTypeId = cur.value.westProjUuid.value;
        const yearTarget = +cur.value.westAnnualGoal.value;
        const monthlyTarget = +cur.value.westMonthlyGoal.value;
        const projTypeName = cur.value.westProjTypeName.value;

        if (acc[projTypeId]) {
          acc[projTypeId].yearlyTarget += yearTarget;
          acc[projTypeId].monthlyTarget += monthlyTarget;
        } else {
          acc[projTypeId] = {
            yearlyTarget: yearTarget,
            monthlyTarget: monthlyTarget,
            projTypeName: projTypeName,
          };
        }
        return acc;
      }, {} as Targets);

    const westOthersYearlyTarget = +(westAnother?.value ?? 0);
    const westOthersMonthlyTarget = +(westMonthlyAnother?.value ?? 0);

    // 合計

    let targets: Targets | undefined = {};
    let othersMonthlyTarget = 0;
    let othersYearlyTarget = 0;

    switch (territory) {
      case '東':
        targets = eastTargets;
        othersMonthlyTarget = eastOthersMonthlyTarget;
        othersYearlyTarget = eastOthersYearlyTarget;
        break;
      case '西':
        targets = westTargets;
        othersMonthlyTarget = westOthersMonthlyTarget;
        othersYearlyTarget = westOthersYearlyTarget;
        break;
      case '全店舗':
        // Add values of east and west targets
        targets = Object.entries({ ...eastTargets })
          .reduce((acc, [key, value]) => {
            const {
              yearlyTarget,
              monthlyTarget,
            } = value;
            if (acc[key]) {
              acc[key].yearlyTarget += yearlyTarget;
              acc[key].monthlyTarget += monthlyTarget;
            } else {
              acc[key] = value;
            }
            return acc;
          }, { ...westTargets });
        othersMonthlyTarget = eastOthersMonthlyTarget + westOthersMonthlyTarget;
        othersYearlyTarget = eastOthersYearlyTarget + westOthersYearlyTarget;
        break;
      
    }

    const { 
      totalMonthlyTarget, 
      totalTargetAmt, 
    } = Object.values({ ...targets }).reduce(
      (acc, cur) => {
        acc.totalMonthlyTarget += cur.monthlyTarget;
        acc.totalTargetAmt += cur.yearlyTarget;
        return acc;
      },
      { totalMonthlyTarget: othersMonthlyTarget, totalTargetAmt: othersYearlyTarget },
    );


    return {
      /** 月でグループしたイベント */
      events,

      /** エリア/工事別 目標金額 */
      eastTargets,
      /** その他工事/東エリア */
      eastOthersYearlyTarget,
      /* その他工事/東エリア月間合計 */
      eastOthersMonthlyTarget,

      /** エリア/工事別 目標金額 */
      westTargets,
      /** その他工事/西エリア */
      westOthersYearlyTarget,
      /* その他工事/西エリア月間合計 */
      westOthersMonthlyTarget,

      targets,
      othersMonthlyTarget,
      othersYearlyTarget,
      totalMonthlyTarget,
      totalTargetAmt,

      /* 報告宣伝費 */
      ads: adTable?.value.reduce((acc, cur) => {
        const month = parseInt(cur.value.adMonth.value);
        if (!acc[month]) {
          acc[month] = {
            expenses: [],
            totalExpenses: 0,
          };
        }
        acc[month].expenses.push({
          id: cur.id || '',
          month: month,
          description: cur.value.adDetails.value,
          expense: +cur.value.adExpense.value,
        });

        acc[month].totalExpenses += +cur.value.adExpense.value;

        return acc;
        
      }, {} as ExpensesByMonth),
      totalAdExpenses: +(adTotal?.value ?? 0),

      /* その他諸経費 */
      otherExpenses: expensesTable?.value.reduce((acc, cur) => {
        const month = parseInt(cur.value.expensesMonth.value);
        if (!acc[month]) {
          acc[month] = {
            expenses: [],
            totalExpenses: 0,
          };
        }
        acc[month].expenses.push({
          id: cur.id || '',
          month: month,
          description: cur.value.expensesDetails.value,
          expense: +cur.value.otherExpenses.value,
        });

        acc[month].totalExpenses += +cur.value.otherExpenses.value;

        return acc;
      }, {} as ExpensesByMonth),
      totalOtherExpenses: +(expensesTotal?.value ?? 0),
    };
   

  }, [
    data, 
    territory, 
  ]);

  const contractsData = useMemo(() => {
    if (!contracts) return null;
    return groupContracts({
      contractRecs: contracts,
      territory,
    });
  }, 
  [
    contracts, 
    territory,
  ]);

  return {
    data: {
      fiscalYearData,
      contractsData,
    },
    ...others,
  };
  
};