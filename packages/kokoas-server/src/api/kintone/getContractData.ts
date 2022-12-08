import {
  getCustGroupById,
  getCustomersByIds,
  getEmployeesByIds,
  getEstimateById,
  getProjById,
  calculateEstimateRecord,
} from 'api-kintone';
import { getCocosumoDetails } from 'api-kintone/src/companyDetails/getCocosumoDetails';
import { getContractCheckers } from 'api-kintone/src/employees/getContractCheckers';
import { addressBuilder, formatDataId } from 'libs';
import { TAgents, TSignMethod } from 'types';
import { validateContractData } from './validateContractData';

export type TContractData = Awaited<ReturnType<typeof getContractData>>;

/**
 * Get Contract data across all involved database
 *
 * @param param
 * @param param.projEstimateId 見積番号
 * @param param.userCode Kintoneのユーザコード
 * @param isValidate Whether to validate or not. Default: false
 * @returns {TContractData} 契約に必要になるデータ
 */
export const getContractData = async ({
  projEstimateId,
} : {
  projEstimateId: string,
  userCode: string,
},
isValidate = false,

) => {
  if (!projEstimateId) throw new Error('Invalid projEstimateId');

  /* 会社情報 */
  const {
    companyAddress,
    companyName,
    companyTel,
    representative,
  } = await getCocosumoDetails();

  /* 見積情報 */
  const estimatedRecord = await getEstimateById(projEstimateId);
  const calculatedEstimates = calculateEstimateRecord({ record: estimatedRecord });

  const {
    signMethod,
    projId,
    envId,
    totalPaymentAmt,
    税: tax,
    envStatus,
    支払い,
    startDate,
    startDaysAfterContract,
    finishDate,
    finishDaysAfterContract,
    completeDate,
    contractDate,
    payMethod,
    payDestination,
    dataId,

  } = estimatedRecord;

  /* 工事情報 */
  const {
    custGroupId, projName,
    postal: projPostal,
    address1: projAddress1,
    address2: projAddress2,
  } = await getProjById(projId.value);

  /* 顧客情報 */
  const {
    agents,
    members,
    storeId,
  } = await getCustGroupById(custGroupId.value);

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
  } = await getContractCheckers(storeId.value);


  /* 支払い */
  const payments = 支払い.value?.map(({ value: {
    isPayEnabled,
    paymentAmt,
    paymentDate,
    paymentType,
  } }) => {
    return {
      isPayEnabled: Boolean(+isPayEnabled.value),
      paymentAmt: +paymentAmt?.value || 0,
      paymentDate: paymentDate?.value || '',
      paymentType: paymentType?.value || '',
    };
  }) ?? [];

  const data = {

    /* 工事 */
    projId: projId.value,
    projEstimateId: formatDataId(dataId.value),
    projName: projName.value,
    projLocation: addressBuilder({
      postal: projPostal.value,
      address1: projAddress1.value,
      address2: projAddress2.value }),

    /* 契約 */
    tax: tax.value,
    contractPrice: totalPaymentAmt.value,
    envelopeId: envId.value,
    signMethod: signMethod.value as TSignMethod,

    /* 顧客 */
    customers,

    /* 担当者 */
    cocoAG,

    /* 店長 */
    storeMngrName: managerName.value,
    storeMngrEmail: managerEmail.value,

    /* 経理 */
    accountingName: accountingName.value,
    accountingEmail: accountingEmail.value,

    /* 契約関連 */
    envelopeStatus: envStatus.value,

    /* 工期 */
    startDate: startDate.value,
    startDaysAfterContract: startDaysAfterContract.value,
    finishDate: finishDate.value,
    finishDaysAfterContract: finishDaysAfterContract.value,
    completeDate: completeDate.value,
    contractDate: contractDate.value ?? '',

    /* 支払い */
    payments,
    payDestination: payDestination.value,
    payMethod: payMethod.value as '持参' | '集金' | '振込',

    /* 計算 */
    calculatedEstimates,

    /* 会社情報 */
    companyAddress: companyAddress.value,
    companyName: companyName.value,
    companyTel: companyTel.value,
    representative: representative.value,

  };

  if (isValidate) validateContractData(data);

  return data;
};
