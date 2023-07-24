import { getRecords } from '../common';
import { RecordKey, RecordType, appId } from './config';


/**
 * Get latest completed contracts
 */
export const getLatestCompletedContracts = async () => {
  const envIdField : RecordKey = 'envelopeStatus';
  const contractDate: RecordKey = 'contractDate';

  const { records } = await getRecords<RecordType>({
    app: appId,
    query: `${envIdField} = "completed" order by ${contractDate} desc limit 3`,
  });

  return records;
};