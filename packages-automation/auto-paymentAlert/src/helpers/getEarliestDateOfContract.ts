import format from 'date-fns/format';



/**
 * 契約書から一番過去の日付を取得します
 * 注意事項：datesとcontractAmtsに渡すあたいは、互いに対応したものとすること
 * 配列の要素順も対応させること
 * 
 * ex.)
 * datas:[dateA, dateB, dateC], contractAmts:[amtA, amtB, amtC]
 * それぞれ、契約日dateAに対応する契約金額はamtAとする
 *  */
export function getEarliestDateOfContract({
  dates,
  contractAmts,
}: {
  dates: string[]
  contractAmts: string[]
}) {
  let oldestDate = null;

  if (dates.length !== contractAmts.length) {
    console.error('getEarliestDateOfContractの引数に誤りがあります');
    return null;
  }

  for (let i = 0; i < dates.length; i++) {
    const dateStr = dates[i];
    const contractAmt = contractAmts[i];

    if (dateStr !== null
      && (contractAmt !== '' && contractAmt !== '0')) {
      const currentDate = new Date(dateStr);
      if (!oldestDate || currentDate < oldestDate) {
        oldestDate = currentDate;
      }
    }
  }
  return oldestDate ? format(oldestDate, 'yyyy-MM-dd') : null;
}
