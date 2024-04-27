


export const kokoasEndpoints = {
  /** 大黒さんの見積をアップロードし、変換する */
  uploadEstimates: 'upload/daikoku/estimate',

  /** 大黒さんの原価をアップロードし、、変換する */
  uploadGenka: 'upload/daikoku/genka',

  /** 案件をAndpadへ登録 */
  saveProjectToAndpad: 'andpad/register',

  /** 案件管理IDで案件を取得 */
  getProjectFromAndpadByProjId: 'andpad/project',

  getProjectFromAndpadBySystemId: 'andpad/system',

  getProjectsFromAndpad: 'andpad/projects',

  /** 
   * 見積をAndpadの実行予算の形式でダウンロード 
  */
  downloadEstimateAsAndpad: 'download/jikkoyosan/andpad',

  /** 
   * 見積をAndpadの見積の形式でダウンロード 
  */
  downloadEstimateAsAndpadEst: 'download/midumori/andpad',

  /**
   * Andpadの発注一覧をkintoneからダウンロード
   */
  downloadCostManagement: 'download/costmanagement/',

  /**
   * 見積を顧客用のxlsxの形式でダウンロード
   * 'download/estimate/customer/:estimateId'
   */
  downloadEstimateForCustomer: 'download/estimate/customer',

  /** 請求書 */
  downloadInvoice: 'download/invoice',

  /** 画像を取得 */
  getImage: 'image',

  /** 原価管理データ */
  //getCostMgtDataByProjId: 'costmanagement/data',
  //getCostMgtDataByProjIdV2: 'costmanagement/data/v2',
  getCostMgtDataByProjIdV4: 'costmanagement/data/v4',
  getCostMgtExcelByData: 'costmanagement/excel',

  /* AndpadのAPIを取得 */
  accessAndpadApi: 'access/andpad/api',

  /** 契約報告書 */
  // downloadContractReport: 'download/contract/report',

  /** 発注書ダウンロード　*/
  downloadOrderSlip: 'download/order',
} as const;

export type TKokoasEndpointKey = keyof typeof kokoasEndpoints;
export type TKokoasEndpoint = typeof kokoasEndpoints[TKokoasEndpointKey];

export const getKokoasEndpoint = (k: TKokoasEndpoint) => k;

/** Docusign endpoints */

export const docusignEndpoints = {
  /** 請負契約書ダウンロード */
  downloadContract: 'contract/download/v2',
  sendDirect: 'contract/send/direct/v2',
  void: 'contract/void/v2',

  /** 修正画面 */
  correct: 'contract/correct',
} as const;

export const openAIEndpoints = {
  generateReading: 'generateReading',
  askForReading: 'askForReading',
};

export const sendGridEndpoints = {
  sendEmail: 'sendEmail',
};