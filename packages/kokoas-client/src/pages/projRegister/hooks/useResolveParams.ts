

import { parseISO, format } from 'date-fns';
import { useProjById, useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { BuildingType, RecordCancelStatus, RecordStatus, TAgents } from 'types';
import { getParam } from '../../../helpers/url';
import { TypeOfForm, initialValues } from '../form';

/**
 * URLで渡されたものを処理する
 */
export const useResolveParams = () => {
  const [initForm, setInitForm] = useState<TypeOfForm>(initialValues);

  const projIdFromURL = getParam('projId');
  const custGroupIdFromURL = getParam('custGroupId');

  const { data: projRec } = useProjById(projIdFromURL || '');
  const { data: custGroupRec } = useCustGroupById(projRec?.custGroupId.value || custGroupIdFromURL || '');

  useEffect(() => {
    if (projRec) {
      const {
        projTypeId, projName,
        custGroupId, $id,
        isAgentConfirmed, postal, address1, address2,
        buildingType, isChkAddressKari, agents, addressKari,
        status,
        cancelStatus,
        projTypeName,
        storeId,
        作成日時: createTime,
      } = projRec;

      const cocoConst = agents.value.filter(item => {
        return (item.value.agentType.value as TAgents) === 'cocoConst';
      }).map(item => item.value.agentId.value);

      setInitForm(prev => ({
        ...prev,
        addressKari: addressKari.value,
        address1: address1.value,
        address2: address2.value,
        buildingType: buildingType.value as BuildingType,
        cancelStatus: cancelStatus.value.split(',') as RecordCancelStatus[],
        cocoConst1: cocoConst?.[0],
        cocoConst2: cocoConst?.[1],
        createdDate: format(parseISO(createTime.value), 'yyyy/MM/dd'),
        custGroupId: custGroupId.value,
        isAgentConfirmed: Boolean(+isAgentConfirmed.value),
        isChkAddressKari: Boolean(+isChkAddressKari.value),
        projId: $id.value,
        projTypeId: projTypeId.value,
        projTypeName: projTypeName.value,
        projName: projName.value,
        postal: postal.value,
        storeId: storeId.value,
        status: (status?.value as RecordStatus) || '追客中',
      }));
    }
  }, [projRec]);

  useEffect(() => {
    if (custGroupRec) {
      const {
        storeId,
        territory,
        $id,
        members,
      } = custGroupRec;
      setInitForm((prev) => ({
        ...prev,
        custGroupId: $id.value,
        storeId: storeId.value,
        territory: territory.value,
        custName: members.value[0]?.value.customerName.value || '',
      }));

    }
  }, [custGroupRec]);

  return initForm;
};