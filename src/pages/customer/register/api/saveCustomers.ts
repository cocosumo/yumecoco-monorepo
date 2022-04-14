import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { CustomerForm } from '../form';
import { formToKintCust } from '../helper';

export const saveCustomers = async (formData: CustomerForm) => {
  return KintoneRecord.addRecords({
    app: APPIDS.customers,
    records: formToKintCust(formData),
  }).then(resp => {
    return resp.records;
  });
};


