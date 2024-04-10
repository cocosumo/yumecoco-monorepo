import { OrderData } from 'types/src/common/order';



export const getOrderData = async (orderId: string): Promise<OrderData> => {

  // TODO 各DBから必要な情報を取得する


  
  const variant = ''; // 仮データ

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
    vendorManeger: variant,
  });

};
