import { getAppId } from 'api-kintone';

export const updateStatus = ({
  id, appId = getAppId(), action = '承認する', assignee,
}:{
  id: any;
  appId?: any;
  action?: any;
  assignee?: any;

}) => {
  const body = {
    app: appId,
    id,
    action,
    assignee,
  };
  console.log(body, 'body');
  return kintone.api(kintone.api.url('/k/v1/record/status.json', true), 'PUT', body);
};

export const updateAllStatus = ({
  ids, appId = getAppId(), action = '承認する', assignee,
}:{
  ids: any;
  appId?: any;
  action?: any;
  assignee?: any;


}) => {
  if (!ids) return null;

  const recsToUpdateStatus = ids.map((id: any) => ({
    id,
    action,
    assignee,
  }));

  const body = {
    app: appId,
    records: recsToUpdateStatus,
  };
  return kintone.api(kintone.api.url('/k/v1/records/status.json', true), 'PUT', body)
    .catch((reason) => console.warn('error: ', reason.message));
};