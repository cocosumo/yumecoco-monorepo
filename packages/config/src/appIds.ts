import { isProd } from 'config';

/* 本番はここで設定する */
export const prodAppIds = {
  customers: 207,
  custGroups: 208,
  projects: 209,
  projEstimates: 210,
  custMemos: 211,
} as const;


/* デフォールトは開発環境のアプリ番号 */
export const AppIds = {
  custGroups : 185,
  custMemos : 181,
  customers : 173,
  employees : 34,
  invoices : 204,
  materialsItem: 69,
  materialsMajor: 67,
  materialsMid: 68,
  projTypes : 190,
  projects : 194,
  projEstimates : 202,
  stores : 19,
  ...(isProd && prodAppIds),
} as const;

export type VAppIds = typeof AppIds[keyof typeof AppIds];