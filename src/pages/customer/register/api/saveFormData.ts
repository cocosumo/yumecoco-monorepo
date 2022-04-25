import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { CustomerForm } from '../form';
import { formToKintConst } from '../helper';
import { saveCustomers } from './saveCustomers';

export const saveFormData = async (formData: CustomerForm) => {
  const savedCustomers = await saveCustomers(formData);
  const transformedForm = formToKintConst(formData, savedCustomers);

  console.log(savedCustomers, 'savedCustomers');


  /* Create record */
  if (!formData.id){
    return KintoneRecord.addRecord({
      app: APPIDS.custGroup,
      record: transformedForm,
    });
  }

  /* Update record */
  return KintoneRecord.updateRecord({
    app: APPIDS.custGroup,
    id: formData.id,
    record: transformedForm,
  })
    .then((resp)=> ({ id: formData.id, revision: resp.revision }));


};