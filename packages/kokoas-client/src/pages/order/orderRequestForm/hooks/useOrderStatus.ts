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

  const orderStatus = (orderId 
    ? status?.value || '未発注'
    : '新規') as KProgress | undefined;

  return {
    orderStatus,
    isFetching,
  };

};