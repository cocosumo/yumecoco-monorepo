import { PeriodLabelList, periodLabelList } from '../../config';



export const getDatePeriod = (dateList: string[], year: string) => {

  if (periodLabelList.some((date) => date === dateList[0])) {
    // 期間が選択されている場合
    switch (dateList[0] as PeriodLabelList) {
      case '全期':
        return {
          startDate: new Date(+year - 1, 12, 1),
          finDate: new Date(+year, 11, 1),
        };
      case '上半期':
        return {
          startDate: new Date(+year - 1, 12, 1),
          finDate: new Date(+year, 5, 1),
        };
      case '下半期':
        return {
          startDate: new Date(+year, 6, 1),
          finDate: new Date(+year, 11, 1),
        };
      default:
        return {
          startDate: new Date(+year - 1, 12, 1),
          finDate: new Date(+year, 11, 1),
        };
    }

  } else {
    // 月が選択されている場合
    return {
      startDate: new Date(dateList[0]),
      finDate: new Date(dateList[dateList.length - 1]),
    };
  }

};

export type GetDatePeriod = ReturnType<typeof getDatePeriod>; 
