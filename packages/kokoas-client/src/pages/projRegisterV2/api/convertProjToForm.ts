import { BuildingType, IEmployees, IProjects, IProjtypes, RecordCancelStatus, TAgents, Territory } from 'types';
import { TForm } from '../schema';
import { formatDataId } from 'libs';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

interface IGetPersistentFieldsParams {
  projRec: IProjects,
  projTypeRec: IProjtypes | undefined,
  hasContract: boolean,
}
interface IConvertProjToFormParams extends IGetPersistentFieldsParams {
  employeeRecs: IEmployees[],
}


/**
 * 運用が変わっても、変わらないフィールドを取得する。
 * なお、役職による紹介料率は、2023.10.01までには無かったので、
 * 以下の条件で設定する
 * * 役職による紹介料率がある場合は、それ以外は、プロジェクトタイプの紹介料率を設定する
 */
const getPersistentFields = ({
  projTypeRec,
  projRec,
  hasContract,
}: IGetPersistentFieldsParams): Pick<TForm, 'commissionRate' | 'commRateByRole' | 'profitRate'> => {

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
    commissionRate: parsedCommRate === '' ? null : Number(parsedCommRate),
    profitRate: parsedProfitRate === '' ? null : Number(parsedProfitRate),
    commRateByRole: parsedCommRateByRoles,
  };
};

export const convertProjToForm = ({
  projRec,
  projTypeRec,
  hasContract,
  employeeRecs,
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

    buildingType, isChkAddressKari, agents, 
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


  return {
    //addressKari: addressKari.value,

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

    agents: agents.value.map(({
      value: {
        agentId,
        empRole,
        agentName,
        agentType,
      },
    }) => {

      const agentRec = employeeRecs.find(({ uuid: _empId }) => _empId.value === agentId.value);
      return ({
        empId: agentId.value,
        empRole: empRole.value || agentRec?.役職.value || '',
        empName: agentName.value || agentRec?.文字列＿氏名.value || '',
        empType: agentType.value as TAgents,

      });
    }),

    createdDate: format(parseISO(createTime.value), 'yyyy/MM/dd'),
    custGroupId: custGroupId.value,
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
    storeId: storeId.value,
    storeName: storeName.value,
    storeCode: storeCode.value,
    territory: territory.value as Territory,
  };

};