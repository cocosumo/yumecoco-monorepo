import { OrderData, OrderDetails } from 'types/src/common/order';



export const getOrderData = async (orderId: string) => {

  

  
  const variant = ''; // 仮データ
  const orderDetails = [] as OrderDetails[];

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
    postCode: variant,
    vendorAddress1: variant,
    vendorAddress2: variant,
    vendorManager1: variant,
    vendorManager2: variant,
    buildingLicenseNumber: variant,
    companyName: variant,
    storeAddress: variant,
    storeTel: variant,
    storeFax: variant,
    invoiceSystemNumber: variant,
    orderDetails: orderDetails,
  };

  return orderData;

};
