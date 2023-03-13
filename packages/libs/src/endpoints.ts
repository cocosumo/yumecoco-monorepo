


export const kokoasEndpoints = {
  /** 大黒さんの見積をアップロードし、変換する */
  uploadEstimates : 'upload/daikoku/estimate',

  /** 大黒さんの原価をアップロードし、、変換する */
  uploadGenka: 'upload/daikoku/genka',

  /** 案件をAndpadへ登録 */
  saveProjectToAndpad: 'andpad/register',

  /** 見積をAndpadの実行予算の形式でダウンロード */
  downloadEstimateAsAndpad: 'download/estimate/andpad',
} as const;

export type TKokoasEndpointKey = keyof typeof kokoasEndpoints;
export type TKokoasEndpoint = typeof kokoasEndpoints[keyof typeof kokoasEndpoints];

export const getKokoasEndpoint = (k: TKokoasEndpoint) => k;
