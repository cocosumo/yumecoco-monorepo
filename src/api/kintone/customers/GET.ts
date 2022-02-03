import { CUSTOMER_APPID } from '../../../helpers/constants';
import { KintoneRecord } from '../config';

export const getAllCustomers = () => {
  KintoneRecord.getAllRecords({ app: CUSTOMER_APPID })
    .then((resp)=>{
      console.log(resp);
    });
};
