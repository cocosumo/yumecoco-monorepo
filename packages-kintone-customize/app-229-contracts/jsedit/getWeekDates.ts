export function getWeekDates(year: number, month: number) {

  const date = new Date(year, month, 0);
  const maxDays = date.getDate();    //該当月の最終日付
            
  const weeks = [];
      
  const currResult: Record<string, null | Date> = {
    startDate: null,  //週の始まりの日付
    endDate: null,    //週の終わりの日付
  };
      
  for (let i = 1; i <= maxDays; i++ ) {
    const currDate = new Date(year, date.getMonth(), i);
          
    const weekIdx = currDate.getDay();
          
    if (weekIdx === 0 && i === 1) {
      currResult.startDate = currDate;
      currResult.endDate = currDate;
    }
          
    if (i === 1 || weekIdx === 1) {
      currResult.startDate = currDate;    
    } else if (i === maxDays || weekIdx === 0) {
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