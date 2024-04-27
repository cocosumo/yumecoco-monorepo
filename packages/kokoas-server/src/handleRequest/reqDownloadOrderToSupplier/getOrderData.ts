import { getCustGroupById, getCustGroupByProjName, getProjById } from 'api-kintone';
import { getCocosumoDetails } from 'api-kintone/src/companyDetails/getCocosumoDetails';
import { getExternalMemberById } from 'api-kintone/src/externalMembers/getExternalMemberById';
import { getOrderById } from 'api-kintone/src/order/getOrderById';
import { getOrderBudgetById } from 'api-kintone/src/orderBudget/getOrderBudgetById';
import { OrderData, OrderDetails, TOrderMethod } from 'types/src/common/order';



export const getOrderData = async (orderId: string): Promise<OrderData> => {

  const orderRecord = await getOrderById(orderId);
  if (!orderRecord) return Object.create(null);


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
    orderMethod: orderRecord.orderMethod.value as TOrderMethod,
    projId: projId.value,
    projNum: projRec.dataId.value,
    projNumJa: '',
    projName: projRec.projName.value,
    custGroupName: '',
    constAddress: '',
    constStartDate: '',
    constFinishDate: '',
    cocoConst: '',
    store: '',
    postCode: '',
    supplierAddress1: '',
    supplierAddress2: '',
    supplierOfficer1: orderRecord.supplicerOfficerName.value,
    supplierOfficer2: '',
    supplierOfficerEmail: orderRecord.supplierOfficerEmail.value,
    emailCc: orderRecord.emailCc.value,
    emailBcc: orderRecord.emailBcc.value,
    buildingLicenseNumber: '',
    companyName: '',
    storeAddress: '',
    storeTel: '',
    storeFax: '',
    invoiceSystemNumber: '',
    orderDetails: orderDetails,
  };

  return orderData;

};
