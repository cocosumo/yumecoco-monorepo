import { KokoasApiNodes } from 'types';

export const getKokoasEndpoint = (k: KokoasApiNodes) => k;

export type TKokoasEnpoint =
| 'uploadEstimates'
| 'uploadGenka'
| 'saveProjectToAndpad';



/** リファクタリングが必要　 ~ ras */
export const kokoasEndpoints : Record<TKokoasEnpoint, KokoasApiNodes> = {
  /** 大黒さんの見積をアップロードし、変換する */
  uploadEstimates : 'upload/daikoku/estimate',

  /** 大黒さんの原価をアップロードし、、変換する */
  uploadGenka: 'upload/daikoku/genka',

  /** 案件をAndpadへ登録 */
  saveProjectToAndpad: 'andpad/register',
};