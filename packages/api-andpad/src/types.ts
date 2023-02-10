import { z } from 'zod';

export const authToken = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  scope: z.string(),
  created_at: z.number(),
  id_token: z.string(),
});

export type AuthToken = z.infer<typeof authToken>;


export const saveProjectData = z.object({
  '案件管理ID': z.string(),
  '案件名': z.string(),
  '顧客管理ID': z.string(),
  '顧客名': z.string(),
  '物件名': z.string(),
  '物件管理ID': z.string(),
  'ラベル:工事内容': z.string(),
  'ラベル:店舗': z.string(),
});

export type SaveProjectData = z.infer<typeof saveProjectData>;

export const saveProjectResponse = z.object({
  'data': z.object({
    'object': z.object({
      '顧客ID': z.number(),
      '顧客管理ID': z.string(),
      '物件ID': z.number(),
      '物件管理ID': z.string(),
      'システムID': z.number(),
      '案件管理ID': z.string(),
      '案件名': z.string(),
      '案件種別': z.string(),
    }),
  }),
});

export type SaveProjectResponse = z.infer<typeof saveProjectResponse>;
