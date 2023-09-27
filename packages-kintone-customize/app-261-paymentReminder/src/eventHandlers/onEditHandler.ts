import { setFieldShown } from 'api-kintone';

/**
 * レコード編集画面を表示した後のイベント処理
 * サブテーブルを非表示にします
 */
export const onEditHandler = () => {
  setFieldShown('notificationSettings', false);
};
