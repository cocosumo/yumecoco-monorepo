import { KForm } from '../schema';

export const fieldMapJa: Partial<Record<KForm, string>> = {
  address1: '住所1',
  address2: '住所2',
  buildingType: '建物種別',
  cancelStatus: 'キャンセルステータス',

  createdDate: '登録日',
  custGroupId: '顧客グループ',
  custName: '顧客名',
  finalAddress1: '確定住所1',
  finalAddress2: '確定住所2',
  finalPostal: '確定郵便番号',

  hasCompletedContract: '契約完了',
  hasContract: '契約中',
  isAddressKari: '仮住所',

  isShowFinalAddress: '確定住所を表示',
  logs: 'ログ',

  memo: 'メモ',

  postal: '郵便番号',
  projDataId: '工事データID',
  projId: '工事ID',
  projName: '工事名',
  projTypeId: '工事種別ID',
  projTypeName: '工事種別名',
  otherProjType: 'その他工事種別',
  inHouseProjTypeId: '自社工事区分ID',
  inHouseProjTypeName: '自社工事区分名',

  deliveryDate: '引渡日',
  projFinDate: '物件完了日',
  payFinDate: '支払完了日',

  status: 'ステータス',
  storeCode: '店舗コード',
  storeId: '店舗ID',
  territory: 'エリア',

  rank: 'ランク',
  schedContractPrice: '契約予定金額',
  schedContractDate: '契約予定日',
  estatePurchaseDate: '不動産決済日',
  planApplicationDate: '計画申し込み日',
  paymentMethod: '金融機関',

  commissionRate: '紹介料率',
  commRateByRole: '役職による紹介料率',
  profitRate: '利益率',
  cocoConst: 'ここすも担当者',
  cocoAG: '営業担当者',
  yumeAG: 'ゆめてつAG',
};