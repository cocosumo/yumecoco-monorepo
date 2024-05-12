import { IOrder } from 'types';
import { TInvoiceForm } from '../schema';

export const convertOrderToForm = (data: IOrder) : Partial<TInvoiceForm> => {

  const {
    uuid,
    projId,
    orderDataId,
  } = data;


  return {
    orderId: uuid.value,
    orderDataId:  orderDataId.value,
    projId: projId.value,
  };
};