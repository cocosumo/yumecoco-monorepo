import { showContractRecords } from './showContractRecords';
import { updateHeaderTitle } from './updateHeaderTitle';

export const refreshResult = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const selectedYear = +(document.querySelector('#selectYear') as HTMLSelectElement).value || currentYear;
  const selectedMonth = +(document.querySelector('#selectMonth') as HTMLSelectElement).value || currentMonth;
  const selectedStore = (document.querySelector('#selectStore') as HTMLSelectElement).value;

                
  updateHeaderTitle();

  showContractRecords(
    selectedYear,
    selectedMonth,
    String(selectedStore),
  );
};