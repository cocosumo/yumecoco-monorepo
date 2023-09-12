const cachedWeeks: Record<string, Record<string, null | Date>[]> = Object.create(null);

const startOfWeek = 1; // 月曜日
const endOfWeek = 0;   // 日曜日


/**
 * キャッシュを利用して、指定された年月の週の日付を取得する
 */
export function getWeekDates(year: number, month: number) {

  const cachedKey = `${year}-${month}`;

  if (cachedWeeks[cachedKey]) {
    return cachedWeeks[cachedKey];
  }

  const date = new Date(year, month, 0);
  const maxDays = date.getDate();    //該当月の最終日付
            
  const weeks = [];
      
  const currResult: Record<string, null | Date> = {
    startDate: null,  //週の始まりの日付
    endDate: null,    //週の終わりの日付
  };
      
  for (let day = 1; day <= maxDays; day++ ) {
    
    const currDate = new Date(year, date.getMonth(), day);
          
    const weekIdx = currDate.getDay();

          
    if (day === 1 && weekIdx === endOfWeek) {
      currResult.startDate = currDate;
      currResult.endDate = currDate;
    }

    if (day === maxDays && weekIdx === startOfWeek ) {
      currResult.startDate = currDate;
      currResult.endDate = currDate;
    }
          
    if (day === 1 || weekIdx === startOfWeek) {
      currResult.startDate = currDate;    
    } else if (day === maxDays || weekIdx === endOfWeek) {
      currResult.endDate = currDate;
    } 
          
    if (currResult.startDate && currResult.endDate ) {
      weeks.push({
        startDate: currResult.startDate,
        endDate: currResult.endDate,
      });
      currResult.startDate = null;
      currResult.endDate = null;
    }
  }
  
  return weeks;
}