import { getAllStores, getContractsByProjId, getCustGroupById, getProjById } from 'api-kintone';
import { getCocosumoDetails } from 'api-kintone/src/companyDetails/getCocosumoDetails';
import { getOrderById } from 'api-kintone/src/order/getOrderById';
import { getOrderBudgetById } from 'api-kintone/src/orderBudget/getOrderBudgetById';
import { OrderData, OrderDetails, TOrderMethod } from 'types/src/common/order';
import { getConstAddress } from './helper/getConstAddress';
import { formatDataId } from 'libs';
import { getProjNumJa } from './helper/getProjNumJa';
import { getSupplierById } from 'api-kintone/src/suppliers/getSupplierById';



export const getOrderData = async (orderId: string): Promise<OrderData> => {
  if (!orderId) return Object.create(null);

  const orderRecord = await getOrderById(orderId);
  if (!orderRecord) return Object.create(null);


  const {
    projId,
    supplierId,
  } = orderRecord;

  const [
    orderBudgetRec,
    projRec,
    companyDetails,
    supplierRec,
    stores,
    contractsRec,
  ] = await Promise.all([
    getOrderBudgetById(projId.value),
    getProjById(projId.value),
    getCocosumoDetails(),
    getSupplierById(supplierId.value),
    getAllStores(),
    getContractsByProjId(projId.value),
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

  const constAddress = getConstAddress(projRec);
  const projNumJa = getProjNumJa(store?.storeNameShort.value, projRec.dataId.value);
  const contractMainRec = contractsRec.find(({ contractType }) => contractType.value === '契約');

  const cocoAG = projRec.agents.value.find(({ value: { agentName, agentType } }) => {
    return agentName.value !== '' && agentType.value === 'cocoAG';
  })?.value.agentName.value || '';
  const cocoConst = projRec.agents.value.filter(({ value: { agentName, agentType } }) => {
    return agentName.value !== '' && agentType.value === 'cocoConst';
  }).map(({ value: { agentName } }) => agentName.value)
    .join(', ');



  const orderData: OrderData = {
    orderId: orderId,
    purchaseOrderId: orderRecord.orderDataId.value,
    orderDate: orderRecord.orderDate.value,
    orderMethod: orderRecord.orderMethod?.value as TOrderMethod,
    projId: projId?.value,

    custGroupName: custGroupRec?.custNames.value,

    projNum: formatDataId(projRec.dataId.value),
    projNumJa: projNumJa,
    projName: projRec.projName.value,
    constAddress: constAddress,
    cocoAG: cocoAG,
    cocoConst: cocoConst,

    constStartDate: contractMainRec?.startDate.value || '', // TODO #1385
    constFinishDate: contractMainRec?.finishDate.value || '', // TODO #1385

    supplierName: supplierRec.supplierName.value,
    postCode: supplierRec.postCode.value,
    supplierAddress1: `${supplierRec.prefectures.value} ${supplierRec.addressFirst.value}`,
    supplierAddress2: supplierRec.addressSecond.value,
    supplierOfficer1: supplierRec.supplierName.value,
    supplierOfficer2: orderRecord.supplicerOfficerName.value,
    supplierOfficerEmail: orderRecord.supplierOfficerEmail.value,
    emailCc: orderRecord.emailCc.value,
    emailBcc: orderRecord.emailBcc.value,

    agStore: store?.店舗名.value || '',
    storeArea: store?.area.value || '',
    storeName: store?.店舗名.value || '',
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
