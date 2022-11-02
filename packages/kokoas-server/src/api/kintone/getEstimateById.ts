import { AppIds } from 'config';
import { IProjestimates } from 'types';
import { KintoneRecord } from './config';

export const getEstimateById = async (id: string) => {
  const result = await KintoneRecord.getRecord({
    app: AppIds.projEstimates,
    id,
  });
  return result.record as unknown as IProjestimates;
};
