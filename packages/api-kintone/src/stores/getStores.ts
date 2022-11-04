
import { getAllRecords } from '../common/getAllRecords';
import { appId, RecordType } from './config';



export const getAllStores = getAllRecords<RecordType>({ app: appId });
