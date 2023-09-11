import $ from 'jquery';
import moment from 'moment';
import { getWeekDates } from '../../../getWeekDates';
import { getFormValues } from '../../../api/getFormValues';

export const hightlightRowsByWeek = () => {
  const {
    year: selectedYear,
    month: selectedMonth,
    week: selectedWeek,
  } = getFormValues();

  const $rows = $('.table_contracts_list tbody tr');

  console.log('triggered');

  $rows
    .removeClass('highlight');

  if (!selectedYear || !selectedMonth || !selectedWeek) {
    return;
  }

  const weeks = getWeekDates(+selectedYear, +selectedMonth);


  $rows
    .each((i, tr) => {
    // return true if 4th column is within the week index
      const contractDate = $(tr).find('td')
        .eq(4)
        .text();

      
      const date = moment(contractDate);
      const isWithinWeek = weeks.some((week, index) => {

        if (index === +selectedWeek) {
          const isWithin = date.isBetween(week.startDate, week.endDate, undefined, '[]');
          console.log('week', selectedWeek, date.format('YYYY-MM-DD'), moment(week.startDate).format('YYYY-MM-DD'), moment(week.endDate).format('YYYY-MM-DD'), isWithin);
          return isWithin;
        }
        return false;
      });

      if (isWithinWeek) {

        // if element does not contain any class containing 'highlight' string, add highlight class
        if (!$(tr)
          .attr('class')
          ?.includes('highlight')
        ) {
          $(tr)
            .addClass('highlight');
        }
      }
    });

};