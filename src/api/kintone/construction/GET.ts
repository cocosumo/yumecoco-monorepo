import { APPIDS, KintoneRecord } from '../config';

export const getConstDetails = async (recordId: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
  });
};

/**
 * Will reorganize code to put specialized api in
 * the directory of the caller.
 * @deprecated
 */
export const getFlatConstDetails = async (recordId:　string) => {
  const kintoneRecord = await getConstDetails(recordId);

  return Object.entries(kintoneRecord.record).reduce((acc, [key, val]) => {

    return { ...acc, [key]: val.value };

  }, {});

};

export const getConstRecord = async (id: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.constructionDetails,
    id,
  }).then(resp => resp.record as unknown as ConstructionDetails.SavedData);
};
