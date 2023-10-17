import { useMemo } from 'react';
import { Targets, useFiscalYearData } from './useFiscalYearData';
import { useTypedWatch } from './useTypedRHF';
import { TForm } from '../schema';

export const useTargetData = () => {
  const [territory] = useTypedWatch({
    name: [
      'territory',
    ],
  }) as [
    TForm['territory'],
  ];
  const { data, ...others } = useFiscalYearData();

  const newData = useMemo(() => {
    if (!data) return null;

    const {
      meetingEventTable,
      eastConstractTargetTable,
      eastAnother,
      eastMonthlyAnother,

      westConstractTargetTable,
      westAnother,
      westMonthlyAnother,
    } = data;

    /** 月でグループしたイベント */
    const events = meetingEventTable.value.reduce((acc, cur) => {
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
    const eastTargets = eastConstractTargetTable.value
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

    const eastOthersYearlyTarget = +eastAnother.value; 
    const eastOthersMonthlyTarget = +eastMonthlyAnother.value;

    /***********
     * 西 エリア
     **********/
    const westTargets = westConstractTargetTable.value
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

    const westOthersYearlyTarget = +westAnother.value;
    const westOthersMonthlyTarget = +westMonthlyAnother.value;

    // 合計

    let targets: Targets = {};
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
        console.log('targets', targets);
        othersMonthlyTarget = eastOthersMonthlyTarget + westOthersMonthlyTarget;
        othersYearlyTarget = eastOthersYearlyTarget + westOthersYearlyTarget;
        break;
    }

    const totalMonthlyTarget = Object.values({ ...targets })
      .reduce((acc, cur) => {
        acc += cur.monthlyTarget;
        return acc;
      }, othersMonthlyTarget);



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

    };

  }, [data, territory]);

  return {
    data: newData,
    ...others,
  };
  
};