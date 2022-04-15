import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { CustomerForm } from '../form';
import { formToKintConst } from '../helper';
import { saveCustomers } from './saveCustomers';

export const saveFormData = async (formData: CustomerForm) => {
  const savedCustomers = await saveCustomers(formData);

  console.log(formData, 'FORMDATA');

  return KintoneRecord.addRecord({
    app: APPIDS.constructionDetails,
    record: formToKintConst(formData, savedCustomers),
  });
};