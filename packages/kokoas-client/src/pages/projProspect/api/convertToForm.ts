import { parseKintoneDate } from 'kokoas-client/src/lib/date';
import { IProjects } from 'types';
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
  uuid: projId,
}: IProjects) : Partial<TypeOfForm> => {
  return {
    projId: projId.value,
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