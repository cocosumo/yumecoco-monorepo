import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { CustomerForm } from '../form';
import { formToKintCust } from '../helper';

export const saveCustomers = async (formData: CustomerForm) => {
  const transformedCust = formToKintCust(formData);

  /* Create record */
  if (!formData.id){
    return KintoneRecord.addRecords({
      app: APPIDS.customers,
      records: transformedCust,
    }).then(resp => resp.records);
  }

  /* Update record */
  return KintoneRecord.updateRecords({
    app: APPIDS.customers,
    records: transformedCust
      .filter(cust => !!cust.$id?.value)
      .map(cust => {
        return  {
          id: cust.$id!.value,
          record: cust,
        };
      }),
  }).then(resp => resp.records);


};


