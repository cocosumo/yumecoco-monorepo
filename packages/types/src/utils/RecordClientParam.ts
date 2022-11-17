import { RecordClient } from '@kintone/rest-api-client/lib/client/RecordClient';
export type KtRecordParam<T extends keyof
RecordClient>  = Parameters<RecordClient[T]>[0];