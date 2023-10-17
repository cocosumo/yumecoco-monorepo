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
import { ReqSendContractParams, TAgents, Territory } from 'types';
import { validateContractData } from '../../api/kintone/validateContractDataV2';
import { isProd } from 'config';

export type TContractData = Awaited<ReturnType<typeof getContractDataV2>>;

const testTantouEmail = 'cocosumo.rpa03@gmail.com'; // 担当
const testCustEmail = 'cocosumo.rpa03@gmail.com'; // 顧客
const testTenchoEmail = 'cocosumo.rpa03@gmail.com'; // 店長
const testKeiriEmail = 'cocosumo.rpa03@gmail.com'; // 経理
const testHonKeiriEmail = 'cocosumo.rpa03@gmail.com'; //　本経理

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
    agents: projAgents,
    store: projStoreName,
    storeId: projStoreId,
  } = await getProjById(projId.value);


  /* 顧客情報 */
  const {
    agents: cgAgents,
    members,
    storeId: cgStoreId,
    storeName: cgStoreName,
  } = await getCustGroupById(custGroupId.value);

  const resolvedStoreId = projStoreId.value || cgStoreId.value;


  const {
    storeNameShort,
    territory,
    //TEL: companyTel,
    //住所: companyAddress,
    //officialStoreName,
  } = await getStoreById(resolvedStoreId);



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
    const custEmail = isProd 
      ? contacts.value
        .find(({ value: { contactType } }) => contactType.value === 'email')
        ?.value.contactValue.value
      : testCustEmail;

    return {
      custName: fullName.value,
      email: custEmail,
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

  /*  担当情報 
      工事データに担当者が入っている場合はそちらを優先する
  */
  let cocoAGIds = projAgents.value
    .filter(({ value: { agentType, agentId } }) => (
      (agentType.value as TAgents) === 'cocoAG' && !!agentId.value))
    .map(({ value: { agentId } }) => agentId.value );

  if (!cocoAGIds.length) {
    cocoAGIds = cgAgents.value
      .filter(({ value: { agentType, employeeId } }) => (
        (agentType.value as TAgents) === 'cocoAG' && !!employeeId.value))
      .map(({ value: { employeeId } }) => employeeId.value );
  }



  const cocoAG = (await getEmployeesByIds(cocoAGIds))
    .records
    .map(({ 文字列＿氏名: empName, email: empEmail }) => ({
      name: empName.value,
      email: isProd ?  empEmail.value : testTantouEmail,
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
  } = await getContractCheckers({
    storeId: projStoreId.value || cgStoreId.value,
    territory: territory.value,
  });

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

  const resolvedStoreName = projStoreName.value || cgStoreName.value;

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
    storeMngrEmail: isProd ? managerEmail.value : testTenchoEmail,
    storeName: resolvedStoreName,
    storeNameShort: storeNameShort.value,
    territory: territory.value as Territory,

    /* 経理 */
    accountingName: accountingName.value,
    accountingEmail: isProd ? accountingEmail.value : testKeiriEmail,

    mainAccountingName: mainAccountingName.value,
    mainAccountingEmail: isProd ? mainAccountingEmail.value : testHonKeiriEmail,

    subAccountingName: subAccountingName.value,
    subAccountingEmail: isProd ? subAccountingEmail.value : testHonKeiriEmail,

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
    companyAddress2: `${companyAddress.value} ハウスドゥ ${resolvedStoreName}`,
    companyName: companyName.value,
    companyTel: companyTel.value,
    representative: representative.value,

    signMethod,
    contractType: contractType.value,
    contractAddType: contractAddType.value,
    isAdditionalContract: contractType.value === '追加',
    isValidate,
  };

  if (isValidate) validateContractData(data);

  return data;
};
