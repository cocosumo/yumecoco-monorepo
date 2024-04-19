import { saveOrder } from './saveOrder';

export const updateStatus = async ({
  orderId,
  status,
}:{
  orderId: string,
  status: string,
}) => {
  if (!orderId) throw new Error('orderId is required');
  if (!status) throw new Error('status is required');

  return saveOrder({
    recordId: orderId,
    record: {
      'status': { value: status },
    },
  });
};