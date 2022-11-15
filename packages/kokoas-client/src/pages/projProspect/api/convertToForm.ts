import { IProjects, TEnvelopeStatus } from 'types';

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
}: IProjects) => {
  return {
    projId: projId.value,
    envelopeStatus: envelopeStatus.value as TEnvelopeStatus,
    custGroupId: custGroupId.value,
    projName: projName.value,
    rank: rank.value,
    schedContractPrice: schedContractPrice.value,
    estatePurchaseDate: estatePurchaseDate.value,
    schedContractDate: schedContractDate.value,
    planApplicationDate: planApplicationDate.value,
    memo: memo.value,
  };
};