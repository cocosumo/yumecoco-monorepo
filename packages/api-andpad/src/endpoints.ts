import { baseURL } from './config';

const getMembersBulkEndpoint = (systemId: string) => `${baseURL}/workman/clients/our/orders/${systemId}/members/bulk`;

export const endpoints = {
  /** 認証コードの取得 */
  authCode: `${baseURL}/auth/oauth/authorize`,

  /** 認証情報の取得 */
  authToken: `${baseURL}/auth/oauth/token`,

  /**　案件詳細情報取得  */
  myOrders: `${baseURL}/my/orders`,

  /*  案件同期（作成|編集） */
  ordersSync: `${baseURL}/workman/our/orders/sync`,

  /** 自社案件一覧取得 */
  ourOrders: `${baseURL}/workman/our/orders`,

  /** 案件メンバー一覧取得 */
  getMembers: (systemId: string) => `${baseURL}/workman/clients/our/orders/${systemId}/members`,

  /** 自社案件への案件メンバー一括登録 */
  addMembers:  getMembersBulkEndpoint,

  /** 自社案件の案件メンバー一括削除 */
  deleteMembers:  getMembersBulkEndpoint,

  updateMembers: getMembersBulkEndpoint,

  /** @deprecated use yumecocolabsAPI instead */
  getDataByUrl : 'https://ga7mbwr93h.execute-api.ap-northeast-1.amazonaws.com/prod/andpad-api',
  
  /** Check AWS API Gateway implementation for more details */
  yumecocolabsAPI: 'https://api.yumecocolabs.com',
} as const;