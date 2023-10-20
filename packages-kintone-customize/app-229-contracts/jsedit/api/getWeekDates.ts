const cachedWeeks: Record<string, Record<string, null | Date>[]> = Object.create(null);

const startOfWeek = 1; // 月曜日
const endOfWeek = 0;   // 日曜日


/**
 * キャッシュを利用して週の曜日を取得計算する
 * @param year - 年
 * @param month - 月（1 から 12）
 * @returns 週ごとの開始日と終了日のオブジェクトの配列
 */
export function getWeekDates(year: number, month: number) {

  const cachedKey = `${year}-${month}`;

  if (cachedWeeks[cachedKey]) {
    // キャッシュから週のデータを返す
    return cachedWeeks[cachedKey];
  }

  const date = new Date(year, month, 0);
  const maxDays = date.getDate();    // 該当月の最終日付
            
  const weeks = [];
      
  const currResult: Record<string, null | Date> = {
    startDate: null,  // 週の始まりの日付
    endDate: null,    // 週の終わりの日付
  };
      
  // 1日から月の最終日まで、曜日を割り振る
  for (let day = 1; day <= maxDays; day++ ) {
    
    const currDate = new Date(year, date.getMonth(), day);
          
    // 曜日を取得
    const weekIdx = currDate.getDay();

    if (day === 1 && weekIdx === endOfWeek) {
      // 1日が日曜日の場合
      currResult.startDate = currDate;
      currResult.endDate = currDate;
    }

    if (day === maxDays && weekIdx === startOfWeek ) {
      // 月の最終日が月曜日の場合
      currResult.startDate = currDate;
      currResult.endDate = currDate;
    }
          
    if (day === 1 || weekIdx === startOfWeek) {
      // 1日 または 月曜日の場合
      currResult.startDate = currDate;    
    } else if (day === maxDays || weekIdx === endOfWeek) {
      // 最終日 または 日曜日の場合
      currResult.endDate = currDate;
    } 
          
    if (currResult.startDate && currResult.endDate ) {
      // 週の開始日と終了日がここまでで設定されている場合、dayをweeks配列に追加
      weeks.push({
        startDate: currResult.startDate,
        endDate: currResult.endDate,
      });
      // 日にちのリセット
      currResult.startDate = null;
      currResult.endDate = null;
    }
  }
  
  return weeks;
}