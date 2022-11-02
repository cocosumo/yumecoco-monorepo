import { AppIds } from 'config';
import { IProjects } from 'types';
import { KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';

const convertToKintone = (formValues: TypeOfForm) : Partial<IProjects>  => {
  const {
    rank,
    estatePurchaseDate,
    planApplicationDate,
    schedContractDate,
    memo,
    schedContractPrice,
  } = formValues;
  return {
    rank: {
      value: rank,
    },
    estatePurchaseDate: {
      value: estatePurchaseDate,
    },
    planApplicationDate: {
      value: planApplicationDate,
    },
    schedContractPrice: {
      value: schedContractPrice,
    },
    schedContractDate: {
      value: schedContractDate,
    },
    memo: {
      value: memo,
    },
  };
};

export const saveForm = async (formValues: TypeOfForm) => {
  if (!formValues.projId) return;

  const converted = convertToKintone(formValues);

  return KintoneRecord.updateRecord({
    app: AppIds.projects,
    id:formValues.projId,
    record: converted,
  });
};