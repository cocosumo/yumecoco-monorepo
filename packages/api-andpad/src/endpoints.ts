import { baseURL } from './config';

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
  addMembers:  (systemId: string) => `${baseURL}/workman/clients/our/orders/${systemId}/members/bulk`,
} as const;