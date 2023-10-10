import { BuildingType, ICustgroups, IEmployees, IProjects, IProjtypes, RecordCancelStatus, TAgents, Territory } from 'types';
import { TForm } from '../schema';
import { formatDataId } from 'libs';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { groupAgentsByType } from 'api-kintone/src/projects/helpers/groupAgentsByType';
import { getDefaultEmployee } from '../form';

interface IGetPersistentFieldsParams {
  projRec: IProjects,
  projTypeRec: IProjtypes | undefined,
  hasContract: boolean,
}
interface IConvertProjToFormParams extends IGetPersistentFieldsParams {
  employeeRecs: IEmployees[],
  custGroupRec: ICustgroups
}


/**
 * 最新設定に依存しない情報。
 * 
 * * 紹介料率
 * * 利益率
 * * 役割別紹介料率
 */
const getPersistentFields = ({
  projTypeRec,
  projRec,
  hasContract,
}: IGetPersistentFieldsParams): Pick<TForm, 'commissionRate' | 'commRateByRole' | 'profitRate' | 'commRateByPerson'> => {

  const {
    yumeCommFeeRate,
    profitRate,
    commRateByRoles,
  } = projTypeRec || {};

  const {
    commissionRate: commissionRateFromProj,
    profitRate: profitRateFromProj,
    commRateByRoles: commRateByRolesFromProj,
  } = projRec;

  // Default to project records values
  let parsedCommRate: string = commissionRateFromProj.value;
  let parsedProfitRate: string = profitRateFromProj.value;

  const projHasCommRateByRole = commRateByRolesFromProj?.value
    .some(({ value: { role } }) => !!role.value);

  let parsedCommRateByRoles: TForm['commRateByRole'] | null = projHasCommRateByRole
    ? commRateByRolesFromProj?.value
      .filter(({ value: { role } }) => !!role.value)
      .map(({
        value: { role, commRateByRole },
      }) => ({
        role: role.value,
        rate: Number(commRateByRole.value),
      }))
    : null;

  const parseCommRateByPerson: TForm['commRateByPerson'] | null = [];

  if (!hasContract) {
    // If there's no contract, use Project Type's values
    parsedCommRate = parsedCommRate || yumeCommFeeRate?.value || '';
    parsedProfitRate = parsedProfitRate || profitRate?.value || '';
    parsedCommRateByRoles = parsedCommRateByRoles
      || commRateByRoles?.value
        .filter(({ value: { role } }) => !!role.value)
        .map(({
          value: { role, commRateByRole },
        }) => ({
          role: role.value,
          rate: Number(commRateByRole.value),
        }))
      || null;

  }

  // If there's no value, set to null to avoid validation error
  return {
    commissionRate: parsedCommRate === '' ? 0 : Number(parsedCommRate),
    profitRate: parsedProfitRate === '' ? 0 : Number(parsedProfitRate),
    commRateByRole: parsedCommRateByRoles,
    commRateByPerson: parseCommRateByPerson,
  };
};

/**
 * KintoneのAGデータをスキーマに沿った成形に変換する
 */
const convertAgentsToForm = ({
  agType,
  agents,
  employeeRecs,
  cgAgents,
}: {
  agents: IProjects['agents']['value'] | undefined,
  agType: TAgents
  employeeRecs: IEmployees[],
  cgAgents: ICustgroups['agents'],
}) => {

  const result = agents
    ?.filter(({ value: { agentId } }) => !!agentId.value)
    .map(({
      value: {
        agentId,
        empRole,
        agentName,
        agentType,
      },
    }) => {

      const agentRec = employeeRecs.find(({ uuid: _empId }) => _empId.value === agentId.value);
      const cgAgent = cgAgents.value.find(({ value: { employeeId } }) => employeeId.value === agentId.value)?.value;

      return ({
        ...getDefaultEmployee((agentType.value || cgAgent?.agentType.value || agType) as TAgents),
        empId: agentId.value,
        empRole: empRole?.value || agentRec?.役職.value || '',
        empName: agentName.value || cgAgent?.employeeName.value || agentRec?.文字列＿氏名.value || '',
      });
    }) || [];


  const hasLastValue = !!result.at(-1)?.empId;

  // add field if empty or last value is not empty, up to 2
  if (!result.length || (hasLastValue && result.length < 2)) {
    result.push(getDefaultEmployee(agType));
  }


  return result;

};


/***********************************
 * Kintoneのレコードをスキーマに沿った成形に変換する
 * 
 **********************************/
export const convertProjToForm = ({
  projRec,
  projTypeRec,
  hasContract,
  employeeRecs,
  custGroupRec,
}: IConvertProjToFormParams): Partial<TForm> => {


  const {

    projTypeId,
    projName,
    otherProjType,
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

    cancelStatus,
    projTypeName,
    作成日時: createTime,
    memo,
    log,

    projFinDate,
    payFinDate,
    deliveryDate,

    rank,
    schedContractPrice,
    estatePurchaseDate,
    planApplicationDate,
    schedContractDate,
    paymentMethod,

    storeId,
    storeCode,
    store: storeName,
    territory,
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

    yumeAG: convertAgentsToForm({
      agents: yumeAG,
      cgAgents: cgAgents,
      agType: 'yumeAG',
      employeeRecs,
    }),
    cocoAG: convertAgentsToForm({
      agents: cocoAG,
      cgAgents: cgAgents,
      agType: 'cocoAG',
      employeeRecs,
    }),
    cocoConst: convertAgentsToForm({
      agents: cocoConst,
      cgAgents: cgAgents,
      agType: 'cocoConst',
      employeeRecs,
    }),

    createdDate: format(parseISO(createTime.value), 'yyyy/MM/dd'),
    custGroupId: custGroupId.value || cgId.value,
    //isAgentConfirmed: Boolean(+isAgentConfirmed.value),
    
    isAddressKari: Boolean(+isChkAddressKari.value),
    isShowFinalAddress: Boolean(+isShowFinalAddress.value),

    projId: uuid.value,
    projTypeId: projTypeId.value,
    projTypeName: projTypeName.value,
    otherProjType: otherProjType.value,
    
    projName: projName.value,
    projDataId: formatDataId(dataId.value),
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
    schedContractPrice: +schedContractPrice.value,
    schedContractDate: schedContractDate.value ? parseISO(schedContractDate.value) : null,
    estatePurchaseDate: estatePurchaseDate.value ? parseISO(estatePurchaseDate.value) : null,
    planApplicationDate: planApplicationDate.value ? parseISO(planApplicationDate.value) : null,
    paymentMethod: paymentMethod.value,

    // Persistent fields
    ...getPersistentFields({
      projRec,
      projTypeRec,
      hasContract,
    }),

    // 店舗情報
    storeId: storeId.value || cgStoreId.value,
    storeName: storeName.value || cgStoreName.value,
    storeCode: storeCode.value || cgStoreCode.value,
    territory: (territory?.value as Territory || cgTerritory.value) || '',
  };

};