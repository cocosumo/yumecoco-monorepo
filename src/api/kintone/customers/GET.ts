import { APP_ID } from './config';
import { KintoneRecord } from '../config';

export const getAllCustomers = () => {
  KintoneRecord.getAllRecords({ app: APP_ID })
    .then((resp)=>{
      console.log(resp);
    });
};
