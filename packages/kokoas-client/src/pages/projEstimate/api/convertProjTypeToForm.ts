import {  IProjtypes } from 'types';
import { TForm } from '../schema';

export const convertProjTypeToForm = (
  recProjType: IProjtypes,
) : Partial<TForm> => {

  const {
    profitRate,
  } = recProjType;

  return {
    projTypeProfitLatest: +profitRate.value,
  };
};