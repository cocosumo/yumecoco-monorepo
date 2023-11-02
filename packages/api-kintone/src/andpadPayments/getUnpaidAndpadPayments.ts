import { appId, RecordKey, RecordType } from './config';
import { getRecords } from '../common';


/**
 * andpad入金一覧のうち、未入金のレコードのみを取得する
 */
export const getUnpaidAndpadPayments = async (
  params?: Omit<Parameters<typeof getRecords>[0], 'app'>,
) => {
  const idField: RecordKey = 'paymentDate';
  const query = `${idField}=""`;

  return getRecords<RecordType>({
    ...params,
    app: appId,
    query,
  }).then(({ records }) => records);
};
