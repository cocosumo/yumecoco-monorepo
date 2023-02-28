
import { RecordType } from './config';
import { saveCustGroup } from './saveCustGroup';

/**
 * uuidによって顧客グループをソフトデリートします。
 *
 * @param {string} id - 削除される顧客グループのID。
 * @returns {Promise<object>} 更新されたレコードオブジェクト。
 * @throws {Error} レコードの更新中にエラーが発生した場合。
 */
export const softDelCustGroupById = async (id: string) => {
  const record: Partial<RecordType> = {
    isDeleted: {
      value: (+true).toString(),
    },
  };

  return saveCustGroup({
    record,
    custGroupId: id,
  });
};