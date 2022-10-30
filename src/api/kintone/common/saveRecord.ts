import { APPIDS, KintoneRecord } from './../config';


export const saveRecord = async (
  {
    appId,
    recordId,
    record,
    revision,
    updateRelatedFn,
  }: 
  {
    appId: APPIDS
    record: Parameters<typeof KintoneRecord.updateRecord>[0]['record'],
    recordId?: string,
    revision?: string,
    updateRelatedFn?: () => Promise<{
      [appId: number] : {
        condition: string,
        records: Array<{
          id: string;
          revision: string;
        }>;
      }
    } | undefined>
  },
) => {

  /** The actual saving process */
  if (recordId) {
    /* UPDATE */
    const result = await KintoneRecord.updateRecord({
      app: appId,
      id: appId,
      record: record,
      revision,
    });

    /** IMPORTANT: This updates related apps to this record */
    const relatedUpdates =  updateRelatedFn ?  await updateRelatedFn() : undefined;

    return {
      ...result,
      id: appId,
      relatedUpdates,
    };

  } else {
    /* ADD */
    return KintoneRecord.addRecord({
      app: appId,
      record: record,
    });
  }
};