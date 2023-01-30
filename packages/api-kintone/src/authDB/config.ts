import { AppIds } from 'config';
import { IAuthdb, KAuthdb } from 'types';

export const appId = AppIds.authDB;
export type RecordType = IAuthdb;
export type RecordKey = KAuthdb;

// サービス名をここに追加
export type ServiceName =
| 'andpad';

export const idField : RecordKey = 'serviceName';

