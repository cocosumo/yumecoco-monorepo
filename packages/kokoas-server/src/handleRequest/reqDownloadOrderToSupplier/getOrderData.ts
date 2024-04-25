import { getCustGroupById, getCustGroupByProjName, getProjById } from 'api-kintone';
import { getCocosumoDetails } from 'api-kintone/src/companyDetails/getCocosumoDetails';
import { getExternalMemberById } from 'api-kintone/src/externalMembers/getExternalMemberById';
import { getOrderById } from 'api-kintone/src/order/getOrderById';
import { getOrderBudgetById } from 'api-kintone/src/orderBudget/getOrderBudgetById';
import { OrderData, OrderDetails } from 'types/src/common/order';



export const getOrderData = async (orderId: string) => {

  const orderRecord = await getOrderById(orderId);
  if (!orderRecord) return {} as OrderData;


  const {
    orderDataId,
    orderDate,
    projId,
    supplierOfficerId,
  } = orderRecord;

  const [
    orderBudgetRec,
    projRec,
    companyDetails,
    externalMemberRec,
  ] = await Promise.all([
    getOrderBudgetById(projId.value),
    getProjById(projId.value),
    getCocosumoDetails(),
    getExternalMemberById(supplierOfficerId.value),
  ]);

  const orderDetails = orderBudgetRec.items.value.reduce((acc, {
    value: {
      orderId: orderIdByorderBudgetRec,
      majorItem,
      middleItem,
      material,
      unit,
      quantity,
      costPrice,
      orderAmountBeforeTax,
      taxRate,
      rowRemarks,
    },
  }) => {
    if (orderIdByorderBudgetRec.value !== orderId) return acc;

    acc.push({
      majorItem: majorItem.value,
      middleItem: middleItem.value,
      material: material.value,
      unit: unit.value,
      quantity: +quantity.value,
      costPrice: +costPrice.value,
      orderAmountBeforeTax: +orderAmountBeforeTax.value,
      taxRate: +taxRate.value,
      rowRemarks: rowRemarks.value,
    });

    return acc;
  }, [] as OrderDetails[]);


  const orderData: OrderData = {
    orderId: orderId,
    purchaseOrderId: orderDataId.value,
    orderDate: orderDate.value,
    projId: projId.value,
    projNum: projRec.dataId.value,
    projNumJa: variant,
    projName: projRec.projName.value,
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
