import { setFieldShown } from 'api-kintone';


/**
 * レコード追加画面(新規作成)を表示した後のイベント処理
 * 
 */
export const onCreateHandler = () => {
  setFieldShown('notificationSettings', false);
  setFieldShown('scheduledAlertDate', false);
};
