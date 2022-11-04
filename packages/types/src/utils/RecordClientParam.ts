import { RecordClient } from '@kintone/rest-api-client/lib/client/RecordClient';
export type RecordClientParam<T extends keyof 
RecordClient>  = Omit<Parameters<RecordClient[T]>, 'app'>;