import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { CustomerForm } from '../form';
import { formToKintConst } from '../helper';
import { saveCustomers } from './saveCustomers';
import { updateProjDetails } from './updateProjDetails';

export const saveFormData = async (formData: CustomerForm) => {
  try {
    const savedCustomers = await saveCustomers(formData);
    const transformedForm = formToKintConst(formData, savedCustomers);

    let saveResult: { id?: string, revision: string }  = Object.create(null);

    /* Create record */
    if (!formData.id) {
      saveResult = await KintoneRecord.addRecord({
        app: APPIDS.custGroup,
        record: transformedForm,
      });
      return saveResult;
    } else {
      saveResult = await KintoneRecord.updateRecord({
        app: APPIDS.custGroup,
        id: formData.id,
        record: transformedForm,
      })
        .then((resp)=> ({ id: formData.id, revision: resp.revision }));
    }

    /* Copy information to project details */
    await updateProjDetails(formData);

    return saveResult;
  } catch (err) {
    throw new Error(err.message);
  }
};