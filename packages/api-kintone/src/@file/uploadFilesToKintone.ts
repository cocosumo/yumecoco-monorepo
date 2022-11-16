import { KtFileParam } from 'types';
import { ktClient } from '../client';

/**
 * 複数ファイルをKintoneにアップロード
 * @param documents
 * @returns ファイルキーの配列
 */
export const uploadFilesToKintone = async (
  documents : KtFileParam<'uploadFile'>['file'][]) => {
  const KintoneClient = await ktClient();

  const uploadPromises = documents.map(async (doc) => {
    const { fileKey } = await KintoneClient.file
      .uploadFile({
        file: doc,
      });
    return fileKey;
  });

  return Promise.all(uploadPromises);
};
