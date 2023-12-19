export const periodLabelList = ['全期', '上半期', '下半期'] as const;
export type PeriodLabelList = typeof periodLabelList[number];

export const areaLabelList = ['全店舗', '西エリア', '東エリア'] as const;
export type AreaLabelList = typeof areaLabelList[number];

export const projTypeList = ['新築', 'リフォーム', '新築付帯', '太陽光', 'その他'] as const;
export type ProjTypeList = typeof projTypeList[number];

export const projSectionList = [
  '分譲住宅',
  '注文住宅',
  'モデル',
  'リフォーム',
  '新店舗建築',
  '店舗ﾘﾌｫｰﾑ300万円以下',
  '店舗ﾘﾌｫｰﾑ300万円以上',
  '外構・造成',
  'サービス工事',
] as const;
export type ProjSectionList = typeof projSectionList[number];


export type GrossProfitTableRows = {
  /** 受注金額計 */
  orderAmtTotalBeforeTax: number,

  /** 粗利 */
  grossprofitAmtTotal: number,

  /** 夢てつ紹介料 */
  introFeeYume: number,

  /** ここすも粗利 */
  grossProfitCoco: number,

  /** ここすも粗利率 */
  grossProfitRateCoco: number,

  /** 受注 月平均 */
  orderAmtMonthlyAve: number,

  /** 粗利 月平均 */
  grossProfitMonthlyAve: number,
};
export type KGrossProfitTableRows = keyof GrossProfitTableRows;
