


export const kokoasEndpoints = {
  /** 大黒さんの見積をアップロードし、変換する */
  uploadEstimates : 'upload/daikoku/estimate',

  /** 大黒さんの原価をアップロードし、、変換する */
  uploadGenka: 'upload/daikoku/genka',

  /** 案件をAndpadへ登録 */
  saveProjectToAndpad: 'andpad/register',

  /** 案件管理IDで案件を取得 */
  getProjectFromAndpadByProjId: 'andpad/project',

  getProjectsFromAndpad: 'andpad/projects',

  /** 
   * 見積をAndpadの実行予算の形式でダウンロード 
   * download/estimate/andpad/:estimateId
  */
  downloadEstimateAsAndpad: 'download/estimate/andpad',

  /**
   * 見積を顧客用のxlsxの形式でダウンロード
   * 'download/estimate/customer/:estimateId'
   */
  downloadEstimateForCustomer: 'download/estimate/customer',
  
  /** 請求書 */
  downloadInvoice: 'download/invoice',
} as const;

export type TKokoasEndpointKey = keyof typeof kokoasEndpoints;
export type TKokoasEndpoint = typeof kokoasEndpoints[TKokoasEndpointKey];

export const getKokoasEndpoint = (k: TKokoasEndpoint) => k;
