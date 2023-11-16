import { getAppId } from 'api-kintone';

export const deleteRecords = ({ 
  appId = getAppId(), 
  ids = [], 
}:{
  appId?: any;
  ids?: string[];
}) => {
  if (!ids.length) return 'No ids to delete.';

  const body = {
    app: appId,
    ids,
  };

  return kintone.api(kintone.api.url(
    '/k/v1/records', true,
  ), 'DELETE', body);
};

