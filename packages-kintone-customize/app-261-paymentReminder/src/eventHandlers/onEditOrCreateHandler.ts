import { setFieldShown } from 'api-kintone';

/**
 * レコード編集画面とレコード追加画面を表示した後のイベント処理
 * サブテーブルと一部メニューを非表示にします
 */
export const onEditOrCreateHandler = () => {
  setFieldShown('notificationSettings', false);
  setFieldShown('scheduledAlertDate', false);
};
