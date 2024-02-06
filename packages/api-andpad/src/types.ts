import { andpadProjFlow, andpadProjTypes } from 'types/src/common/andpad.order';
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

export const buildingTypesAndpad = ['マンション', '戸建', 'オフィス', '店舗', 'アパート', 'その他'] as const;
export type BuildingTypesAndpad = typeof buildingTypesAndpad[number];

export const projectTypesAndpad = ['新築', '新築付帯', 'リフォーム', '太陽光', '外構', '解体', 'その他'] as const;
export type ProjectTypesAndpad = typeof buildingTypesAndpad[number];

export const storeNamesAndpad = [
  '豊田店', 
  '中川店', 
  '大林店', 
  '美里店', 
  '豊川店', 
  '向山店',
  '八幡店', 
  '高浜店', 
  '千種店', 
  '大垣店', 
  '蒲郡店', 
  '八熊店', 
  '藤沢店', 
  '岩田店',
  '日進店',
] as const;
export type StoreNamesAndpad = typeof storeNamesAndpad[number];

export const storeMap : Record<string, StoreNamesAndpad> = {
  豊田中央店: '豊田店',
  豊川中央店: '豊川店',
  豊橋向山店: '向山店',
  千種大久手店: '千種店',
  高浜中央店: '高浜店',
  豊田大林店: '大林店',
  豊川八幡店: '八幡店',
  大垣店: '大垣店',
  蒲郡店: '蒲郡店',
  豊橋藤沢店: '藤沢店',
  中川八熊店: '中川店',
  豊田美里店: '美里店',
  豊橋岩田店: '岩田店',
  日進店: '日進店',

};

/**
 * string[]の場合、
 * 選択方法についてですが、店舗の場合は、"ラベル:店舗":"ラベル1,ラベル2"のような指定となります。
 */
export const saveProjectData = z.object({
  'システムID': z.number().optional(),
  '顧客ID': z.number().optional(),

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
  '顧客電話番号2': z.string().nullish(),

  /** 顧客メールアドレス */
  '顧客メールアドレス': z.string().optional(),

  /** 工事番号  */
  '物件管理ID': z.string(),

  /** 建物種別 (戸建,マンション,店舗,その他)　指定しない場合はマンションで指定される */
  '物件種別': z.enum(buildingTypesAndpad).optional(),

  /** 契約者名+様邸 */
  '物件名': z.string(),

  /** "新しい住所を入力する"に固定
   * (顧客情報の住所と同じ,新しい住所を入力する)から選択。顧客住所、物件住所の双方を物件住所として使用する想定であれば、ココアス側で指定する必要性あり
   */
  '物件住所種別': z.literal('新しい住所を入力する').optional(),

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
  '案件種別': z.enum(andpadProjTypes).optional(),

  /** “契約前”で固定 */
  '案件フロー':  z.enum(andpadProjFlow).optional(),

  /** 契約日 */
  //'契約日(実績)': z.string().optional(),

  /** 工事種別で連携 */
  'ラベル:工事内容': z.enum(projectTypesAndpad),

  /** 店舗 */
  'ラベル:店舗': z.string().optional(),

  /** 顧客都道府県 */
  '顧客都道府県': z.string().optional(),

  /** 物件都道府県 */
  '物件都道府県': z.string().optional(),
});

export type SaveProjectData = z.infer<typeof saveProjectData>;
export type SaveProjectDataKeys = keyof SaveProjectData;
export const saveProjectDataKeys = Object.keys(saveProjectData.shape) as SaveProjectDataKeys[];

export interface SaveProjectParams {
  projData: SaveProjectData,
  members: string[],
}


export const projects = z.object({
  '顧客ID': z.number(),
  '顧客管理ID': z.string().nullable(),
  '物件ID': z.number(),
  '物件管理ID': z.string().nullable(),
  'システムID': z.number(),
  '案件管理ID': z.string().nullable(),
  '案件名': z.string(),
  '案件種別': z.string(),
});

export const saveProjectResponse = z.object({
  'data': z.object({
    'object': projects,
  }),
});

export type Projects = z.infer<typeof projects>;
export type ProjectsKeys = keyof Projects;
export type SaveProjectResponse = z.infer<typeof saveProjectResponse>;


export interface GetMyOrders {
  series?: SaveProjectDataKeys[],
  limit?: number,
  offset?: number,
  q?: string,
}

export const getMyOrdersResponse = z.object({
  data: z.object({
    total: z.number(),
    last_flg: z.boolean(),
    limit: z.number(),
    offset: z.number(),
    objects: z.array(saveProjectData),
  }),
});


export type GetMyOrdersResponse = z.infer<typeof getMyOrdersResponse>; 

/** メンバー招待 */

export interface ReqMemberBody {
  /** 案件管理ID利用フラグ。trueを指定した場合、パスのorder_idを案件管理IDとして扱う */
  use_order_common_id?: boolean,

  /** emailもありますが、今回はcommon_id (社員名簿のuuid) のみに固定します。 */
  identification_type: 'common_id' | 'email',

} 

export interface Member {
  key: string // 社員番号
}

export interface ExtendedMember extends Member {
  role: 'admin' | 'basic'
  job_names?: string[]
}

export interface ReqDelMembersBody extends ReqMemberBody {
  members : Array<Member> 
}

export interface ReqAddMembersBody extends ReqMemberBody {
  /** 案件メンバー追加が成功したユーザに案件招待のお知らせを送るかどうか。 */
  send_notification?: boolean,
  members : Array<ExtendedMember>
}

export interface ReqUpdateMembersBody extends ReqMemberBody {
  members : Array<ExtendedMember>
} 
