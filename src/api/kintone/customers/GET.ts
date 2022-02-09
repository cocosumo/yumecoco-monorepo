import { APP_ID, KintoneRecord } from './config';

export const getAllCustomers = () => {
  KintoneRecord.getAllRecords({ app: APP_ID })
    .then((resp)=>{
      console.log(resp);
    });
};
