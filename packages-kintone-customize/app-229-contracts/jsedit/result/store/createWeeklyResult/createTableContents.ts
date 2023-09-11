import moment from 'moment';
import { getFormValues } from '../../../api/getFormValues';
import { getWeekDates } from '../../../api/getWeekDates';

export const createTableContents = ($el: JQuery<HTMLElement>, records: DB.SavedRecord[]) => {
  const {
    year,
    month,
  } = getFormValues();

  const weeks = getWeekDates(+year, +month); 

  weeks.forEach((w, index) => {
    let totalContractAmountIntax = 0;
    let totalProfitInclTax = 0;
    let totalProfitExclTax = 0;
    let totalFee = 0;

    const thisWeekRecords = records
      .filter(({
        contractDate,
      }) => {
        const date = moment(contractDate.value);
        return date.isBetween(w.startDate, w.endDate, undefined, '[]');
      });

    for (const rec of thisWeekRecords) {
      totalContractAmountIntax += parseFloat(rec.contractAmountIntax.value);
      totalProfitExclTax += parseFloat(rec.profit.value);
      totalProfitInclTax +=  parseFloat(rec.profit.value) * 1.1;
      totalFee += parseFloat(rec.fee.value);
    }

    $el.find('tbody').append(`
      <tr>
        <td id="weekHeader">第${index + 1}週：${moment(w.startDate).format('M/D')}～${moment(w.endDate).format('M/D')}</td>
        <td id="weekContractAmountIntax">${totalContractAmountIntax.toLocaleString()}</td>
        <td id="weekProfit">${ totalProfitExclTax.toLocaleString()}</td>
        <td id="weekProfitIntax">${Math.round(totalProfitInclTax).toLocaleString() }</td>
        <td id="weekFee">${totalFee.toLocaleString()}</td>
        <td id="WeekNumberSum">${thisWeekRecords.length}</td>
    </tr>
    `);
  });
};