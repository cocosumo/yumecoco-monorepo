import { toKintoneDateStr } from 'kokoas-client/src/lib/date';
import { IProjects } from 'types';
import { TypeOfForm } from '../form';

export const convertToKintone = (formValues: TypeOfForm) : Partial<IProjects>  => {
  const {
    rank,
    estatePurchaseDate,
    planApplicationDate,
    schedContractDate,
    memo,
    schedContractPrice,
    custGroupId,
  } = formValues;
  return {
    custGroupId: { value: custGroupId },
    rank: {
      value: rank,
    },
    estatePurchaseDate: {
      value: toKintoneDateStr(estatePurchaseDate),
    },
    planApplicationDate: {
      value: toKintoneDateStr(planApplicationDate),
    },
    schedContractDate: {
      value: toKintoneDateStr(schedContractDate),
    },
    schedContractPrice: {
      value: schedContractPrice,
    },
    memo: {
      value: memo,
    },
  };
};