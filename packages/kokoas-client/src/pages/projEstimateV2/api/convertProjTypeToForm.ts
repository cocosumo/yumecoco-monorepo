import {  IProjtypes } from 'types';
import { TypeOfForm } from '../form';

export const convertProjTypeToForm = (
  recProjType: IProjtypes,
) : Partial<TypeOfForm> => {

  const {
    profitRate,
  } = recProjType;

  return {
    projTypeProfitLatest: +profitRate.value,
  };
};