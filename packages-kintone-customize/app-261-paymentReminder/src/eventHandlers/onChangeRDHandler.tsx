import { getSpaceElement } from 'api-kintone';
import { createRoot } from 'react-dom/client';
import { KintoneEvent } from '../types/types';
import { ReminderDateAnnouce } from '../components/ReminderDateAnnouce';
import { calcReminderDate } from '../helpers/calcReminderDate';

/**
 * レコード編集/作成画面で'reminderDate'フィールドの値を変更したときのイベント処理
 * 「再通知日をyyyy年MM月dd日に設定します」のコメントを'reminderDateAnnounce'へ表示する
 */
export const onChangeRDHandler = (event: KintoneEvent) => {
  const { record: {
    reminderDate,
  } } = event;

  const spaceElement = getSpaceElement('reminderDateAnnounce');

  const newDate = calcReminderDate(reminderDate.value);


  if (!spaceElement) return;

  const root = createRoot(spaceElement);

  root.render(
    <ReminderDateAnnouce reminderDate={newDate} />,
  );

};
