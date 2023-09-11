import { getContractsGroupedByStore } from '../api/getContractRecords';
import { getFormValues } from '../api/getFormValues';
import { showResultByStore } from './store/showResultByStore';

export const refreshResult = async () => {
  const {
    year,
    month,
    store,
  } = getFormValues();

  const result = await getContractsGroupedByStore({
    year,
    month,
    store,
  });

  for (const [storeId, contracts] of Object.entries(result)) {

    await showResultByStore({
      records: contracts,
      storeId: storeId,
    });
  }
};