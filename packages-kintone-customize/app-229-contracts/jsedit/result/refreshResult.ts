import { getContractsGroupedByStore } from '../api/getContractRecords';
import { getFormValues } from '../api/getFormValues';
import { getPrintArea } from '../initialize/createPrintArea';
import { createHightlightOptions } from './createHightlightOptions';
import { showResultByStore } from './store/showResultByStore';


export const refreshResult = async () => {
  const {
    year,
    month,
    store,
  } = getFormValues();

  createHightlightOptions(+year, +month);

  const result = await getContractsGroupedByStore({
    year,
    month,
    store,
  });
  
  getPrintArea().empty();

  console.log(result);

  for (const [storeId, contracts] of Object.entries(result)) {

    await showResultByStore({
      records: contracts,
      storeId: storeId,
    });
  }
};