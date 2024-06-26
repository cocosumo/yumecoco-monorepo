import { KForm, KItem } from '../schema';

/** hotfixで仮実装です。時間が空いたら、翻訳をシステム全体に共有出来るようにします。~RAS */
export const ja: Record<KForm | KItem, string> = {
  selected: '選択',
  projId: '工事番号',
  storeName: '店舗名',
  costPrice: '原価',
  items: '項目',
  majorItem: '大項目',
  material: '部材',
  middleItem: '中項目',
  quantity: '数量',
  projName: '工事名',
  taxRate: '税率',
  status: 'ステータス',
  unit: '単位',
  rowCostPriceBeforeTax: '発注金額税抜',
  rowRemarks: '行備考',
  supplierName: '業者名',
  orderId: '発注番号',
  orderDataId: '発注管理番号',
  itemId: '部材のID',
  revision: 'リビジョン',
};