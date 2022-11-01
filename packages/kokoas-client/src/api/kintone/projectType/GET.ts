import { APPIDS, KintoneRecord } from '../config';

/**
 * 工事種別名で、工事種別レコードを取得する
 *
 * @param projType 工事種別
 * @returns 工事種別のレコード
 * @deprecated ラベルはよく変わるフィールドで不安定な参照フィールド
 */
export const getProjTypeByLabel = async (projType: string) => {
  const compareKeys: Array<keyof ConstructionTypes.SavedData> = ['label', 'projectName'];

  try {
    const { records } = await KintoneRecord.getRecords({
      app: APPIDS.constructionType,
      query: compareKeys
        .map(key => `${key} = "${projType}"`)
        .join(' or '),

    });

    if (records.length === 0) throw new Error('Not found.');
    if (records.length > 1) throw new Error(`${records.length} duplicates Found.`);

    return records[0] as unknown as ConstructionTypes.SavedData;

  } catch (err: any) {
    throw new Error(`Failed to get projectType. ${err.message}`);
  }
};


/**
 * 工事種別名で、工事種別レコードを取得する
 *
 * @param projId レコード番号
 * @returns 工事種別のレコード
 */
export const getProjTypeById = async (projId: string) => {
  const compareKeys: keyof ConstructionTypes.SavedData = '$id';

  try {
    const { records } = await KintoneRecord.getRecords({
      app: APPIDS.constructionType,
      query: `${compareKeys} = "${projId}"`,

    });

    if (records.length === 0) throw new Error('Not found.');
    if (records.length > 1) throw new Error(`${records.length} duplicates Found.`);

    return records[0] as unknown as ConstructionTypes.SavedData;

  } catch (err: any) {
    throw new Error(`Failed to get projectType. ${err.message}`);
  }
};