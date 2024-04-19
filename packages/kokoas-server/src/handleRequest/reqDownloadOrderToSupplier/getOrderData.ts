import { OrderData } from 'types/src/common/order';



export const getOrderData = async (orderId: string) => {

  // TODO 各DBから必要な情報を取得する


  
  const variant = ''; // 仮データ

  const orderData: OrderData = {
    orderId: orderId,
    purchaseOrderId: variant,
    orderDate: variant,
    projId: variant,
    projNum: variant,
    projNumJa: variant,
    projName: variant,
    custGroupName: variant,
    constAddress: variant,
    constStartDate: variant,
    constFinishDate: variant,
    cocoConst: variant,
    store: variant,
    vendorAddress1: variant,
    vendorAddress2: variant,
    vendorManeger: variant,
    buildingLicenseNumber: variant,
    companyName: variant,
    storeAddress: variant,
    storeTel: variant,
    storeFax: variant,
    invoiceSystemNumber: variant,
  };

  return orderData;

};
