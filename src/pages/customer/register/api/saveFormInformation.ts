import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { CustomerForm } from '../form';
import { saveCustomers } from './saveCustomers';

export const saveFormInformation = (formData: CustomerForm) => {
  const savedCustomers = saveCustomers(formData);

  return KintoneRecord.addRecord({
    app: APPIDS.constructionDetails,
  });
};