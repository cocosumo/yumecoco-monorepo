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
    let totalCount = 0;

    const thisWeekRecords = records
      .filter(({
        contractDate,
      }) => {
        const date = moment(contractDate.value);
        return date.isBetween(w.startDate, w.endDate, undefined, '[]');
      });

    for (const rec of thisWeekRecords) {
      if (rec.yumeAGName.value === '' || rec.yumeAGName.value === 'ここすも') continue;

      totalContractAmountIntax += parseFloat(rec.contractAmountIntax.value);
      totalProfitExclTax += parseFloat(rec.profit.value);
      totalProfitInclTax +=  parseFloat(rec.profit.value) * 1.1;
      totalFee += parseFloat(rec.fee.value);
      totalCount++;
    }

    $el.find('tbody').append(`
      <tr>
        <td >第${index + 1}週：${moment(w.startDate).format('M/D')}～${moment(w.endDate).format('M/D')}</td>
        <td style="text-align: right;">${totalContractAmountIntax.toLocaleString()}</td>
        <td style="text-align: right;">${ totalProfitExclTax.toLocaleString()}</td>
        <td style="text-align: right;">${Math.round(totalProfitInclTax).toLocaleString() }</td>
        <td style="text-align: right;">${totalFee.toLocaleString()}</td>
        <td style="text-align: center;">${totalCount}</td>
    </tr>
    `);
  });
};