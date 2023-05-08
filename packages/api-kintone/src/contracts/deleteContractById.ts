import { ktRecord } from '../client';
import { appId } from './config';
import { getContractById } from './getContractById';

/**
 * 
 * @param ids 
 * @see https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/record.md#deleterecords
 */
export const deleteContractById = async (id: string) => {
  if (!id) throw new Error('削除するidsは必須です。');

  // 本番と開発環境のレコード番号は同等の可能性が高いので、
  // まず、uuidでレコードを取得して、そこからレコード番号を取得する。
  // API呼び出し回数が増えますが、まれに行う処理のようで、整合性を優先します。
  const {
    $id,
  } = await getContractById(id) || {};

  if (!$id) throw new Error('削除するidが見つかりませんでした。');

  // DELETE処理は1件であっても複数件であっても同じ記法です。
  return (await ktRecord()).deleteRecords({
    app: appId,
    ids: [$id.value],
  });
  
};