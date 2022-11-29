import { getAllRecords } from '../common';
import { appId, RecordKey, RecordType } from './config';

export const getPostalCodes = async (
  {
    prefecture,
    city,
  } : {
    prefecture: string,
    city: string,
  }, 
) => {
  const prefField: RecordKey = 'pref';
  const cityField: RecordKey = 'city';
  const townField: RecordKey = 'townReading';

  return getAllRecords<RecordType>({
    app: appId,
    condition: [
      `${prefField} = "${prefecture}"`,
      `${cityField} = "${city}"`,
    ].join(' and '),
    orderBy: `${townField} asc`,
  });
};