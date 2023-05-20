import { format, parseISO } from 'date-fns';
import { formatDataId } from 'libs';
import { BuildingType, ICustgroups, IProjects, RecordCancelStatus, TAgents, Territory } from 'types';
import { TypeOfForm, initialValues } from '../form';

export const convertProjToForm = (projRec: IProjects) : Partial<TypeOfForm> => {

  const {
    projTypeId,
    projName,
    custGroupId,
    dataId,
    uuid,
    isAgentConfirmed, postal, address1, address2,
    buildingType, isChkAddressKari, agents, addressKari,
    cancelStatus,
    projTypeName,
    storeId,
    作成日時: createTime,
    remarks,
    log,
  } = projRec;

  const cocoConst = agents.value.filter(item => {
    return (item.value.agentType.value as TAgents) === 'cocoConst';
  }).map(item => item.value.agentId.value);

  const remarksFormatted : TypeOfForm['remarks'] | undefined = remarks
    ?.value
    ?.filter(item => item.value.note.value)
    .map(({
      value: items,
    }, idx) => {
      const {
        note,
        noteCreateTime,
        noteUpdateTime,
      } = items;
      return {
        id: `remarks.${idx + 1}`,
        noteCreateTime: parseISO(noteCreateTime.value),
        noteUpdateTime: parseISO(noteUpdateTime.value),
        remark: note.value,
      };
    }) ?? [];

  return {
    addressKari: addressKari.value,
    address1: address1.value,
    address2: address2.value,
    buildingType: buildingType.value as BuildingType,
    cancelStatus: cancelStatus.value.split(',') as RecordCancelStatus[],
    cocoConst1: cocoConst?.[0] || '',
    cocoConst2: cocoConst?.[1] || '',
    createdDate: format(parseISO(createTime.value), 'yyyy/MM/dd'),
    custGroupId: custGroupId.value,
    isAgentConfirmed: Boolean(+isAgentConfirmed.value),
    isAddressKari: Boolean(+isChkAddressKari.value),
    projId: uuid.value,
    projTypeId: projTypeId.value,
    projTypeName: projTypeName.value,
    projName: projName.value,
    projDataId: formatDataId(dataId.value),
    postal: postal.value,
    storeId: storeId.value,
    remarks: [initialValues.remarks[0], ...remarksFormatted],
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
  };

};

export const convertCustGroupToForm = (custGroupRec: ICustgroups) : Partial<TypeOfForm> => {
  const {
    storeId,
    territory,
    uuid,
    members,
    storeCode,
  } = custGroupRec;

  return {
    custGroupId: uuid.value,
    storeId: storeId.value,
    territory: territory.value as Territory,
    custName: members.value[0]?.value.customerName.value || '',
    storeCode: storeCode.value,
  };

};