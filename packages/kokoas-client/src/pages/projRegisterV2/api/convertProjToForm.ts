import { BuildingType, ICustgroups, IEmployees, IProjects, RecordCancelStatus, Territory } from 'types';
import { TForm } from '../schema';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { groupAgentsByType } from 'api-kintone/src/projects/helpers/groupAgentsByType';
import { convertProjAgentsToForm } from './convertProjAgentsToForm';

interface IConvertProjToFormParams {
  hasContract: boolean,
  employeeRecs: IEmployees[],
  custGroupRec: ICustgroups,
  projRec: IProjects,
}



/***********************************
 * Kintoneのレコードをスキーマに沿った成形に変換する
 * 
 **********************************/
export const convertProjToForm = ({
  projRec,
  employeeRecs,
  custGroupRec,
}: IConvertProjToFormParams): Partial<TForm> => {


  const {

    projTypeId,
    projName,
    otherProjType,
    inHouseProjTypeId,
    inHouseProjTypeName,
    custGroupId,
    dataId,
    uuid,
     
    postal, 
    address1, 
    address2,

    isShowFinalAddress,
    finalPostal, 
    finalAddress1,
    finalAddress2,

    buildingType,
    isChkAddressKari,

    agents,
    isAgentConfirmed,

    cancelStatus,
    projTypeName,
    作成日時: createTime,
    memo,
    log,

    projFinDate,
    payFinDate,
    deliveryDate,

    rank,
    realEstateStatus,
    schedContractPrice,
    estatePurchaseDate,
    planApplicationDate,
    schedContractDate,
    paymentMethod,

    storeId,
    storeCode,
    store: storeName,
    territory,

    ledgerInfo,
    
  } = projRec;

  const {
    storeId: cgStoreId,
    territory: cgTerritory,
    uuid: cgId,
    members: cgMembers,
    storeCode: cgStoreCode,
    agents: cgAgents,
    storeName: cgStoreName,
  } = custGroupRec;

  const {
    yumeAG,
    cocoAG,
    cocoConst,
  } = groupAgentsByType(agents);


  return {
    //addressKari: addressKari.value,

    custName: cgMembers.value[0]?.value.customerName.value || '',
    finalPostal: finalPostal.value,
    finalAddress1: finalAddress1.value,
    finalAddress2: finalAddress2.value,

    address1: address1.value,
    address2: address2.value,
    buildingType: buildingType.value as BuildingType,
    cancelStatus: cancelStatus
      .value
      .split(',')
      .filter(Boolean) as RecordCancelStatus[],

    yumeAG: convertProjAgentsToForm({
      agents: yumeAG,
      cgAgents: cgAgents,
      agType: 'yumeAG',
      employeeRecs,
    }),
    cocoAG: convertProjAgentsToForm({
      agents: cocoAG,
      cgAgents: cgAgents,
      agType: 'cocoAG',
      employeeRecs,
    }),
    cocoConst: convertProjAgentsToForm({
      agents: cocoConst,
      cgAgents: cgAgents,
      agType: 'cocoConst',
      employeeRecs,
    }),

    createdDate: format(parseISO(createTime.value), 'yyyy/MM/dd'),
    custGroupId: custGroupId.value || cgId.value,
    isNotCocoConstConfirmed: !(+isAgentConfirmed.value), // isAgentConfirmedは肯定なので、isNotCocoConstConfirmedに格納の際、反転させる
    
    isAddressKari: Boolean(+isChkAddressKari.value),
    isShowFinalAddress: Boolean(+isShowFinalAddress.value),

    projId: uuid.value,
    projTypeId: projTypeId.value,
    projTypeName: projTypeName.value,
    otherProjType: otherProjType.value,
    inHouseProjTypeId: inHouseProjTypeId.value,
    inHouseProjTypeName: inHouseProjTypeName.value,
    
    projName: projName.value,
    projDataId: dataId.value,
    postal: postal.value,

    memo: memo.value,

    deliveryDate: deliveryDate.value ? parseISO(deliveryDate.value) : null,
    projFinDate: projFinDate.value ? parseISO(projFinDate.value) : null,
    payFinDate: payFinDate.value ? parseISO(payFinDate.value) : null,

    logs: log?.value?.map(({
      id,
      value: {
        logDateTime,
        logNote,
      },
    }) => {
      return {
        dateTime: logDateTime.value ? parseISO(logDateTime.value) : undefined,
        log: logNote.value,
        id,
      };
    }) ?? [],

    // 見込み
    rank: rank.value,
    realEstateStatus: (realEstateStatus.value || 'あり') as TForm['realEstateStatus'],
    schedContractPrice: +schedContractPrice.value,
    schedContractDate: schedContractDate.value ? parseISO(schedContractDate.value) : null,
    estatePurchaseDate: estatePurchaseDate.value ? parseISO(estatePurchaseDate.value) : null,
    planApplicationDate: planApplicationDate.value ? parseISO(planApplicationDate.value) : null,
    paymentMethod: paymentMethod.value,


    // 店舗情報
    storeId: storeId.value || cgStoreId.value,
    storeName: storeName.value || cgStoreName.value,
    storeCode: storeCode.value || cgStoreCode.value,
    territory: (territory?.value as Territory || cgTerritory.value) || '',

    // 管理台帳
    ledgerInfo: ledgerInfo.value || 'ANDPAD',
  };

};