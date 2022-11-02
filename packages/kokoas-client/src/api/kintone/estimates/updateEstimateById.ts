import { IProjestimates } from 'types';
import { APPIDS, KintoneRecord } from './../config';


export const updateEstimateById = (
  id: string,
  record: Partial<IProjestimates>,
) => {


  return KintoneRecord.updateRecord({
    app: APPIDS.projectEstimate,
    id,
    record,
  });
};