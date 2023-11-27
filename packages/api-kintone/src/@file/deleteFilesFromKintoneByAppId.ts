import { ktClient } from '../client';
import { produce } from 'immer';


/**
 * Deletes files from a Kintone record by its app ID.
 * This function has been tested for client-side only.
 * Adjust for server-side use when needed.
 * 
 * @template T - The type of the kintone record.
 * @param appId - The ID of the Kintone app.
 * @param recordUuid - The UUID of the record.
 * @param fieldCode - The field code of the attachment field in the record.
 * @param fileKeys - The file keys of the files to be deleted.
 * @returns A promise that resolves to the result of the record update operation.
 * 
 */
export const deleteFilesFromKintoneByAppId = async <T>({
  appId,
  recordUuid,
  fieldCode,
  fileKeys,
}:{
  appId: string | number,
  recordUuid: string,
  fieldCode: keyof T,
  fileKeys : string | string[],
}) => {
  const fileKeysToDelete = Array.isArray(fileKeys) ? fileKeys : [fileKeys];

  const KintoneClient = await ktClient();

  const { records: [existingRecord] } = await KintoneClient.record.getRecords({
    app: appId,
    query: `uuid = "${recordUuid}"`,
    fields: [fieldCode as string],
  }); 

  if (!existingRecord) {
    throw new Error('Record not found');
  }

  const newFiles = produce(
    existingRecord[fieldCode as keyof typeof existingRecord] as kintone.fieldTypes.File, 
    (draft) => {
      draft.value = draft.value.filter(({ fileKey }) => !fileKeysToDelete.includes(fileKey));
    },
  );

  return KintoneClient.record.updateRecord({
    app: appId,
    updateKey:{
      field: 'uuid',
      value: recordUuid,
    },
    record: {
      [fieldCode]: newFiles,
    },
  });


};
