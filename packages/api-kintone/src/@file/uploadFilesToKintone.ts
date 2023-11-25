import { KtFileParam } from 'types';
import { ktClient } from '../client';

/**
 * 複数ファイルをKintoneにアップロード
 * @param documents
 * @returns ファイルキーの配列
 */
export const uploadFilesToKintone = async (
  documents : KtFileParam<'uploadFile'>['file'][],
) => {
  const KintoneClient = await ktClient();
  /* const data = Buffer.from(fileBase64, 'base64'); */


  const uploadPromises = documents.map(async (doc) => {
    /* Re-assign no avoid mutating param */
    const converted = { ...doc };

    if ('data' in converted) {
      converted.data = Buffer.from(converted.data as string, 'base64');
    }

    const { fileKey } = await KintoneClient.file
      .uploadFile({
        file: { ...converted },
      });
    return fileKey;
  });

  return Promise.all(uploadPromises);
};
