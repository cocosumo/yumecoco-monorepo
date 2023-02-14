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
  '顧客管理ID': z.string(), // 顧客グループ番号
  '顧客名': z.string(), // 契約者１
  '顧客名（カナ）': z.string().optional(), //契約者1フリガナ
  '顧客郵便番号': z.string().optional(), // 顧客郵便番号
  '顧客現住所': z.string().optional(), // 顧客住所・住所（建物名）
  '顧客担当者名': z.string().optional(), // 営業担当者1
  '顧客電話番号1': z.string().optional(), // 顧客電話番号1
  '顧客電話番号2': z.string().optional(), // 顧客電話番号2
  '顧客メールアドレス': z.string().optional(), // 顧客メールアドレス

  '物件管理ID': z.string(), // 工事番号
  '物件種別': z.string().optional(), // 建物種別 (戸建,マンション,店舗,その他)　指定しない場合はマンションで指定される
  '物件名': z.string(), // 契約者名+様邸
  '物件住所種別': z.string().optional(), // 新しい住所を入力する
  '物件郵便番号': z.string().optional(), // 工事場所郵便番号
  '物件住所': z.string().optional(), // 工事場所住所・住所（番地以降）

  '案件管理ID': z.string(), // 工事番号
  '案件名': z.string(), // 契約店舗名+工事名称
  '案件種別': z.string().optional(), // 工事種別　=>　"新築","リフォーム"で振り分ける
  '案件フロー': z.literal('契約前'), // “契約前”で固定
  '契約日(実績)': z.string().optional(), // 契約日
  'ラベル:工事内容': z.enum(['新築', '新築付帯', 'リフォーム', '太陽光', '外構', '解体', 'その他']), // 工事種別で連携
  'ラベル:店舗': z.string().optional(), // 店舗
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
