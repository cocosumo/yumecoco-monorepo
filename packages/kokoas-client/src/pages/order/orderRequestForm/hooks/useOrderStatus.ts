import { useOrderById } from 'kokoas-client/src/hooksQuery';
import { useOrderWatch } from './useOrderRHF';
import { KProgress } from 'types/src/common/order';
import { TOrderForm } from '../schema';

export const useOrderStatus = () => {
  const orderId = useOrderWatch({
    name: 'orderId',
  }) as TOrderForm['orderId'];

  const { 
    data, 
    isFetching,
  } = useOrderById({ orderId });


  const {
    status,
  } = data || {};


  let orderStatus = status?.value as KProgress | undefined;

  if (orderId && status?.value === '') {
    orderStatus = '未発注';
  }

  return {
    orderStatus,
    isFetching,
  };

};