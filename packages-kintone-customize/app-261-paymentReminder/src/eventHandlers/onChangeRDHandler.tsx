import { getSpaceElement } from 'api-kintone';
import { createRoot } from 'react-dom/client';
import { KintoneEvent } from '../types/types';
import { ReminderDateAnnouce } from '../components/ReminderDateAnnouce';
import { calcReminderDate } from '../helpers/calcReminderDate';
import { KReminderList } from '../config';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

/**
 * レコード編集/作成画面で'reminderDate'フィールドの値を変更したときのイベント処理
 * 「再通知日をyyyy年MM月dd日に設定します」のコメントを'reminderDateAnnounce'へ表示し
 * 再通知日を設定する
 */
export const onChangeRDHandler = (event: KintoneEvent) => {
  const { record: {
    reminderDate,
    scheduledAlertDate,
    expectedPaymentDate,
  } } = event;

  // 再通知日を表示する
  const spaceElement = getSpaceElement('reminderDateAnnounce');
  const newDate = calcReminderDate({
    reminderDate: reminderDate.value as KReminderList,
    depositDate: expectedPaymentDate.value,
  });

  if (!spaceElement) return;

  const root = createRoot(spaceElement);


  root.render(
    <ReminderDateAnnouce reminderDate={newDate} />,
  );

  // 再通知日を設定する(何も選択しない場合はデフォルト3日後に設定する)
  scheduledAlertDate.value = newDate !== 'default' ? newDate : format(addDays(new Date(), 3), 'yyyy-MM-dd');

  return event;
};
