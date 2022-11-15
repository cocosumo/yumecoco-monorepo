import { parseKintoneDate } from 'kokoas-client/src/lib/date';
import { IProjects, TEnvelopeStatus } from 'types';
import { TypeOfForm } from '../form';

export const convertToForm = ({
  rank,
  estatePurchaseDate,
  memo,
  schedContractDate,
  schedContractPrice,
  planApplicationDate,
  projName,
  custGroupId,
  envelopeStatus,
  $id: projId,
}: IProjects) : Partial<TypeOfForm> => {
  return {
    projId: projId.value,
    envelopeStatus: envelopeStatus.value as TEnvelopeStatus,
    custGroupId: custGroupId.value,
    projName: projName.value,
    rank: rank.value,
    schedContractPrice:  schedContractPrice.value,
    estatePurchaseDate: parseKintoneDate(estatePurchaseDate.value),
    schedContractDate: parseKintoneDate(schedContractDate.value),
    planApplicationDate: parseKintoneDate(planApplicationDate.value),
    memo: memo.value,
  };
};