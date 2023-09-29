import { setFieldShown } from 'api-kintone';


/**
 * レコード詳細画面を表示した後のイベント処理
 * サブテーブルと一部メニューを非表示にします
 */
export const onDetailShowHandler = () => {

  setFieldShown('notificationSettings', false);
  setFieldShown('reminderDate', false);

};
