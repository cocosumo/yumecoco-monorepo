import { FileClient } from '@kintone/rest-api-client/lib/client/FileClient';
import { RecordClient } from '@kintone/rest-api-client/lib/client/RecordClient';

export type KtRecordParam<T extends keyof RecordClient>  = Parameters<RecordClient[T]>[0];

export type KtFileParam<T extends keyof FileClient> = Parameters<FileClient[T]>[0];