import { OrderData } from 'types/src/common/order';



export const getOrderData = async (orderId: string): Promise<OrderData> => {

  const [

  ] = await Promise.all([

  ]);

  const variant = '';

  return ({
    orderId: orderId,
    purchaseOrderId: variant,
    orderDate: variant,
    projId: variant,
    projNum: variant,
    projNumJa: variant,
    projName: variant,
    custGroupName: variant,
    constAddress: variant,
    constPeriod: variant,
    cocoConst: variant,
    store: variant,
    vendorAddress: variant,
    vendorMng: variant,
  });

};
