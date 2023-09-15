import { AppClient } from '@kintone/rest-api-client/lib/src/client/AppClient';
import { FileClient } from '@kintone/rest-api-client/lib/src/client/FileClient';
import { RecordClient } from '@kintone/rest-api-client/lib/src/client/RecordClient';

export type KtRecordParam<T extends keyof RecordClient> = Parameters<RecordClient[T]>[0];

export type KtFileParam<T extends keyof FileClient> = Parameters<FileClient[T]>[0];

export type KtAppParam<T extends keyof AppClient> = Parameters<AppClient[T]>[0];

export interface GetRecordsParams<T> {
  limit?: number,
  orderMethod?: 'asc' | 'desc',
  orderBy?: T
}