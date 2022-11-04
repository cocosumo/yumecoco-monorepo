import { RecordClient } from '@kintone/rest-api-client/lib/client/RecordClient';
export type KtRecordParam<T extends keyof 
RecordClient>  = Omit<Parameters<RecordClient[T]>[0], 'app'>;