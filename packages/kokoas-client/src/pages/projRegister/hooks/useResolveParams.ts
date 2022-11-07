

import { useProjById, useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { BuildingType, RecordCancelStatus, RecordStatus, TAgents, TEnvelopeStatus } from 'types';
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
        envelopeStatus,
        projTypeName,
        storeId,

      } = projRec;

      const cocoConst = agents.value.filter(item => {
        return (item.value.agentType.value as TAgents) === 'cocoConst';
      }).map(item => item.value.agentId.value);

      setInitForm(prev => ({
        ...prev,
        recordId: $id.value,
        custGroupId: custGroupId.value,
        projTypeId: projTypeId.value,
        projTypeName: projTypeName.value,
        projName: projName.value,
        isAgentConfirmed: Boolean(+isAgentConfirmed.value),
        postal: postal.value,
        address1: address1.value,
        address2: address2.value,
        buildingType: buildingType.value as BuildingType,
        isChkAddressKari: Boolean(+isChkAddressKari.value),
        cocoConst1: cocoConst?.[0],
        cocoConst2: cocoConst?.[1],
        addressKari: addressKari.value,
        storeId: storeId.value,
        status: (status?.value as RecordStatus) || '追客中',
        envelopeStatus: envelopeStatus.value as TEnvelopeStatus,
        cancelStatus: cancelStatus.value.split(',') as RecordCancelStatus[],
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