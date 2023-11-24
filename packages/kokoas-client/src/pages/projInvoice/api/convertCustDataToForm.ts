import { TypeOfForm } from '../form';



export const convertCustDataToForm = (
  recCustData: DBCustgroups.SavedData,
): Partial<TypeOfForm>  => {
  //const {
  //custNames,
  //} = recCustData;



  return {
    custName: '', //custNames .value, custnamesは廃止されます
  };

};