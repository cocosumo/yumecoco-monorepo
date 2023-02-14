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
  /**  顧客グループ番号 */
  '顧客管理ID': z.string(),

  /** 契約者1フリガナ */
  '顧客名': z.string(),

  /**契約者1フリガナ */
  '顧客名（カナ）': z.string().optional(),

  /**顧客郵便番号 */
  '顧客郵便番号': z.string().optional(),

  /**顧客住所・住所（建物名） */
  '顧客現住所': z.string().optional(),

  /** 営業担当者1 */
  '顧客担当者名': z.string().optional(),

  /**顧客電話番号1 */
  '顧客電話番号1': z.string().optional(),

  /** 顧客電話番号2 */
  '顧客電話番号2': z.string().optional(),

  /** 顧客メールアドレス */
  '顧客メールアドレス': z.string().optional(),

  /** 工事番号  */
  '物件管理ID': z.string(),

  /** 建物種別 (戸建,マンション,店舗,その他)　指定しない場合はマンションで指定される
   * (マンション,戸建,オフィス,店舗アパート,その他)から選択。指定しない場合はマンションで指定される
   */
  '物件種別': z.string().optional(),

  /** 契約者名+様邸 */
  '物件名': z.string(),

  /** "新しい住所を入力する"に固定
   * (顧客情報の住所と同じ,新しい住所を入力する)から選択。顧客住所、物件住所の双方を物件住所として使用する想定であれば、ココアス側で指定する必要性あり
   */
  '物件住所種別': z.string().optional(),

  /** 工事場所郵便番号 */
  '物件郵便番号': z.string().optional(),

  /** 工事場所住所・住所（番地以降） */
  '物件住所': z.string().optional(),

  /** 工事番号 */
  '案件管理ID': z.string(),

  /** 契約店舗名+工事名称 */
  '案件名': z.string(),

  /** 工事種別　=>　"新築","リフォーム"で振り分ける
   * (リフォーム,新築,リノベーション,エクステリア,アフター,分譲,注文,その他)から選択。指定しない場合はリフォームが指定される
   */
  '案件種別': z.string().optional(),

  /** “契約前”で固定 */
  '案件フロー': z.literal('契約前'),

  /** 契約日 */
  '契約日(実績)': z.string().optional(),

  /** 工事種別で連携 */
  'ラベル:工事内容': z.enum(['新築', '新築付帯', 'リフォーム', '太陽光', '外構', '解体', 'その他']),

  /** 店舗 */
  'ラベル:店舗': z.string().optional(),
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
