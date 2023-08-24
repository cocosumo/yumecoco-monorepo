import { getAppId, getRecords } from 'api-kintone';

/**
 * Fetch all records if condition is not provided
 *
 * @param condition optional filter condition
 * @returns
 */
export const fetchReservations = async (condition = '') => {

  const appId = getAppId();

  if (!appId) {
    throw new Error('App ID is not defined');
  }

  return getRecords<DB.SavedRecord>({
    app: appId,
    query: condition,
  });
};
