import {
  getCustGroupById,
  getCustomersByIds,
  getEmployeesByIds,
  getProjById,
  getContractById,
  getStoreById,
} from 'api-kintone';
import { getCocosumoDetails } from 'api-kintone/src/companyDetails/getCocosumoDetails';
import { getContractCheckers } from 'api-kintone/src/employees/getContractCheckers';
import { addressBuilder, formatDataId } from 'libs';
import { ReqSendContractParams, TAgents } from 'types';
import { validateContractData } from '../../api/kintone/validateContractDataV2';

export type TContractData = Awaited<ReturnType<typeof getContractDataV2>>;

/**
 * Get Contract data across all involved database
 *
 * @param param
 * @param param.contractId 見積番号
 * @param param.userCode Kintoneのユーザコード
 * @param isValidate Whether to validate or not. Default: false
 * @returns {TContractData} 契約に必要になるデータ
 */
export const getContractDataV2 = async (
  {
    contractId,
    signMethod = 'electronic',
  } : Omit<ReqSendContractParams, 'electronic'>,
  isValidate = false,
) => {


  /* 会社情報 */
  const {
    companyAddress,
    companyName,
    companyTel,
    representative,
  } = await getCocosumoDetails();

  console.log('Company Address', companyName.value);

  /* 見積情報 */
  const contractRecord = await getContractById(contractId);

  const {
    uuid,
    projId,
    totalContractAmt,
    tax,
    
    contractAmt,
    contractAmtDate,

    initialAmt,
    initialAmtDate,

    interimAmt,
    interimAmtDate,

    finalAmt,
    finalAmtDate,

    othersAmt,
    othersAmtDate,

    payMethod,
    payDestination,

    startDate,
    startDaysAfterContract,

    finishDate,
    finishDaysAfterContract,

    deliveryDate,
    contractDate,
    
    envelopeId,
    envelopeStatus,

    contractType,
    contractAddType,
  } = contractRecord;

  /* 工事情報 */
  const {
    custGroupId, projName,
    postal: projPostal,
    address1: projAddress1,
    address2: projAddress2,
    dataId,
    projTypeName,
    projTypeId,
  } = await getProjById(projId.value);

  /* 顧客情報 */
  const {
    agents,
    members,
    storeId,
    storeName,
  } = await getCustGroupById(custGroupId.value);

  const {
    storeNameShort,
    //TEL: companyTel,
    //住所: companyAddress,
    //officialStoreName,
  } = await getStoreById(storeId.value);



  const custIds = members.value
    .map(({ value: { custId } }) => custId.value );

  const rawCustomers = await getCustomersByIds(custIds);

  /* 顧客全員 */
  const customers = rawCustomers.map(({
    fullName,
    contacts,
    postalCode,
    address1,
    address2,
  }) => {
    return {
      custName: fullName.value,
      email: contacts.value
        .find(({ value: { contactType } }) => contactType.value === 'email')
        ?.value.contactValue.value,
      address: addressBuilder({
        postal: postalCode.value,
        address1: address1.value,
        address2: address2.value }),
      shortAddress: addressBuilder({
        postal: postalCode.value,
        address1: address1.value,
      }),
      postalCode: postalCode.value,
      address1: address1.value,
      address2: address2.value,
    };
  });

  /* 担当情報 */
  const cocoAGIds = agents.value
    .filter(({ value: { agentType } }) => (
      (agentType.value as TAgents) === 'cocoAG'))
    .map(({ value: { employeeId } }) => employeeId.value );
  const cocoAG = (await getEmployeesByIds(cocoAGIds))
    .records
    .map(({ 文字列＿氏名: empName, email: empEmail }) => ({
      name: empName.value,
      email: empEmail.value,
    }) );

  const {
    /* 店長 */
    storeMgr: {
      文字列＿氏名: managerName,
      email: managerEmail,
    },
    /* 経理 */
    accounting : {
      文字列＿氏名: accountingName,
      email: accountingEmail,
    },
    mainAccounting: {
      文字列＿氏名: mainAccountingName,
      email: mainAccountingEmail,
    },
    subAccounting: {
      文字列＿氏名: subAccountingName,
      email: subAccountingEmail,
    },
  } = await getContractCheckers(storeId.value);

  const parsedTaxRate = +tax.value;
  const parsedTotalContractAmt = +totalContractAmt.value;
  const totalContractAmtBeforeTax = parsedTotalContractAmt / (1 + parsedTaxRate);
  const totalTaxAmount = parsedTotalContractAmt - totalContractAmtBeforeTax;

  /* 支払い予定 */

  const payments : Array<{ paymentAmt: number, paymentDate: string }> = [
    { paymentAmt: +contractAmt.value, paymentDate: contractAmtDate.value },
    { paymentAmt: +initialAmt.value, paymentDate: initialAmtDate.value },
    { paymentAmt: +interimAmt.value, paymentDate: interimAmtDate.value },
    { paymentAmt: +finalAmt.value, paymentDate: finalAmtDate.value },
    { paymentAmt: +othersAmt.value, paymentDate: othersAmtDate.value },
  ];

  console.log(totalTaxAmount);

  const data = {

    /* 工事 */
    projId: projId.value,
    contractId: uuid.value,
    dataId: formatDataId(dataId.value),
    projName: projName.value,
    projLocation: addressBuilder({
      postal: projPostal.value,
      address1: projAddress1.value,
      address2: projAddress2.value, 
    }),
    projectLocationData: {
      postal: projPostal.value,
      address1: projAddress1.value,
      address2: projAddress2.value,
    },
    projTypeId: projTypeId.value,
    projTypeName: projTypeName.value,

    /* 契約 */
    tax: parsedTaxRate * 100,
    totalContractAmtAfterTax: parsedTotalContractAmt,
    totalContractAmtBeforeTax,
    totalTaxAmount,
    envelopeId: envelopeId.value,

    /* 顧客 */
    customers,

    /* 担当者 */
    cocoAG,

    /* 店長 */
    storeMngrName: managerName.value,
    storeMngrEmail: managerEmail.value,
    storeName: storeName.value,
    storeNameShort: storeNameShort.value,

    /* 経理 */
    accountingName: accountingName.value,
    accountingEmail: accountingEmail.value,
    mainAccountingName: mainAccountingName.value,
    mainAccountingEmail: mainAccountingEmail.value,
    subAccountingName: subAccountingName.value,
    subAccountingEmail: subAccountingEmail.value,

    /* 契約関連 */
    envelopeStatus: envelopeStatus.value,

    /* 工期 */
    startDate: startDate.value,
    startDaysAfterContract: +startDaysAfterContract.value,
    finishDate: finishDate.value,
    finishDaysAfterContract: +finishDaysAfterContract.value,
    deliveryDate: deliveryDate.value,
    contractDate: contractDate.value ?? '',

    /* 支払い */
    payments,
    payDestination: payDestination.value,
    payMethod: payMethod.value as '持参' | '集金' | '振込',

    /* 会社情報 */
    companyAddress: companyAddress.value,
    companyAddress2: `${companyAddress.value} ハウスドゥ ${storeName.value}`,
    companyName: companyName.value,
    companyTel: companyTel.value,
    representative: representative.value,

    signMethod,
    contractType: contractType.value,
    contractAddType: contractAddType.value,
    isAdditionalContract: contractType.value === '追加',
  };

  if (isValidate) validateContractData(data);

  return data;
};
