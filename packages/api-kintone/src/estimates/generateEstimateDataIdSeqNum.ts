
import { zeroPad } from 'libs';
import { getRecords } from '../common';
import { RecordKey } from '../projects/config';
import { appId, dataIdPadding, RecordType } from './config';


/**
 *
 * 連番を生成する
 *
 * @params Prefix of dataId. E.g. KKB
 * @returns partial dataId. E.g C22-00039
 */
export const generateEstimateDataIdSeqNum = async (projDataId: string) => {

  let sequenceNumber = 1;

  const fields : RecordKey[] = ['uuid', 'dataId'];
  const dataIdField : RecordKey = 'dataId';
  const query = `(${dataIdField} like "${projDataId}") and (${dataIdField} != "") order by dataId desc limit 1`;

  const { records } = await getRecords<RecordType>({
    app: appId,
    fields,
    query,
    totalCount: false,
  });

  if (records.length) {
    sequenceNumber += +(records[0].dataId.value.slice(-dataIdPadding)) ;
  }

  const result =  `${projDataId}-${zeroPad(sequenceNumber, dataIdPadding)}`;

  console.log(result, records[0]);

  return result ;

};