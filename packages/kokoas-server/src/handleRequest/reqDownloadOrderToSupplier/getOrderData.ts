import { getAllStores, getCustGroupById, getProjById } from 'api-kintone';
import { getCocosumoDetails } from 'api-kintone/src/companyDetails/getCocosumoDetails';
import { getExternalMemberById } from 'api-kintone/src/externalMembers/getExternalMemberById';
import { getOrderById } from 'api-kintone/src/order/getOrderById';
import { getOrderBudgetById } from 'api-kintone/src/orderBudget/getOrderBudgetById';
import { OrderData, OrderDetails, TOrderMethod, areaBaseStores } from 'types/src/common/order';
import { getConstAddress } from './helper/getConstAddress';



export const getOrderData = async (orderId: string): Promise<OrderData> => {

  const orderRecord = await getOrderById(orderId);
  if (!orderRecord) return Object.create(null);


  const {
    projId,
    supplierOfficerId,
  } = orderRecord;

  const [
    orderBudgetRec,
    projRec,
    companyDetails,
    externalMemberRec,
    stores,
  ] = await Promise.all([
    getOrderBudgetById(projId.value),
    getProjById(projId.value),
    getCocosumoDetails(),
    getExternalMemberById(supplierOfficerId.value),
    getAllStores(),
  ]);

  if (!projRec) return Object.create(null);

  const custGroupRec = await getCustGroupById(projRec.uuid.value);
  const store = stores.find(({ uuid }) => uuid.value === projRec.storeId.value);

  const orderDetails = orderBudgetRec?.items.value.reduce((acc, {
    value: {
      orderId: orderIdByOrderBudgetRec,
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
    if (orderIdByOrderBudgetRec.value !== orderId) return acc;

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

  const storeAreaBase = store?.area.value === '東' ? areaBaseStores['東'] : areaBaseStores['西'];
  const constAddress = getConstAddress(projRec);

  const orderData: OrderData = {
    orderId: orderId,
    purchaseOrderId: orderRecord.orderDataId.value,
    orderDate: orderRecord.orderDate.value,
    orderMethod: orderRecord.orderMethod?.value as TOrderMethod,
    projId: projId?.value,

    custGroupName: custGroupRec.custNames.value,

    projNum: projRec.dataId.value,
    projNumJa: '',
    projName: projRec.projName.value,
    constAddress: projRec.,
    constStartDate: '',
    constFinishDate: '',
    cocoAG: '',
    cocoConst: '',
    supplierName: '',
    postCode: '',
    supplierAddress1: '',
    supplierAddress2: '',
    supplierOfficer1: orderRecord.supplicerOfficerName.value,
    supplierOfficer2: '',
    supplierOfficerEmail: orderRecord.supplierOfficerEmail.value,
    emailCc: orderRecord.emailCc.value,
    emailBcc: orderRecord.emailBcc.value,

    agStore: store?.店舗名.value || '',
    storeArea: store?.area.value || '',
    storeName: storeAreaBase,
    storeAddress: store?.住所.value || '',
    storeTel: store?.TEL.value || '',
    storeFax: store?.FAX.value || '',

    buildingLicenseNumber: companyDetails?.kensetsugyoKyoka.value,
    companyName: companyDetails?.companyName.value,
    invoiceSystemNumber: companyDetails?.invoiceSystemNumber.value,

    orderDetails: orderDetails,
  };

  return orderData;

};
