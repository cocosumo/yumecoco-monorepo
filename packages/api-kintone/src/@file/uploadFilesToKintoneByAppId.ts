import { KtFileParam } from 'types';
import { ktClient } from '../client';

/**
 * This function has been tested for client-side only.
 * Convenience function for uploading files to Kintone
 * 
 * 
 * @param param0 
 * @param param.appId アプリID
 * @param param.fieldCode フィールドコード
 * @param param.documents ファイルの配列
 * 
 * @see https://kintone.dev/en/docs/kintone/js-api/other/kintone-rest-api-request/
 * @see https://cybozudev.zendesk.com/hc/ja/articles/200283219-%E6%97%A2%E5%AD%98%E3%81%AE%E6%B7%BB%E4%BB%98%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E6%AE%8B%E3%81%97%E3%81%A6%E6%96%B0%E3%81%9F%E3%81%AB%E6%B7%BB%E4%BB%98%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B
 */
export const uploadFilesToKintoneByAppId = async <T>({
  appId,
  recordUuid,
  fieldCode,
  documents,
}:{
  appId: string | number,
  recordUuid: string,
  fieldCode: keyof T,
  documents : KtFileParam<'uploadFile'>['file'][],
}) => {

  const KintoneClient = await ktClient();

  const fileKeys: string[] = [];

  for (const doc of documents) {
    if ('data' in doc)   { 
      const { fileKey } = await KintoneClient.file
        .uploadFile({
          file: doc,
        });
      fileKeys.push(fileKey);

    }
  }

  const { records: [existingRecord] } = await KintoneClient.record.getRecords({
    app: appId,
    query: `uuid = "${recordUuid}"`,
    fields: [fieldCode as string],
  });

  if (!existingRecord) {
    throw new Error('Record not found');
  }

  const existingFileKeys = (existingRecord[fieldCode] as kintone.fieldTypes.File).value.map(({ fileKey }) => fileKey);

  // Append new file keys to existing file keys
  const newFileKeys = [...existingFileKeys, ...fileKeys]
    .map((fileKey) => ({ fileKey }));

  return KintoneClient.record.updateRecord({
    app: appId,
    updateKey:{
      field: 'uuid',
      value: recordUuid,
    },
    record: {
      [fieldCode]: {
        value: newFileKeys,
      },
    },
  });
};