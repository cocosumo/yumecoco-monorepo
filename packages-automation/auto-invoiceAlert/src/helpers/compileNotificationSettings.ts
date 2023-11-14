import { IInvoiceReminder, chatworkRooms } from '../../config';
import { CwRoomIds } from '../../types/InvoiceReminder';



/**
 * kintoneの通知対象者を更新します
 * @param param.exsistingSettings 既存の通知先
 * @param param.updateSettings 最新の通知先
 * @returns IInvoiceReminder['notificationSettings']型で最新の通知先を返す
 */
export const compileNotificationSettings = ({
  exsistingSettings,
  updateSettings,
}: {
  exsistingSettings: IInvoiceReminder['notificationSettings'],
  updateSettings: CwRoomIds[],
}) => {

  console.log('exsistingSettings', exsistingSettings);

  for (const room of updateSettings) {
    let chkFlg = false;

    // cocoasGroupが設定されている場合は、通知先の取得に失敗しているため、対象外
    if (room.cwRoomId === chatworkRooms.cocoasGroup) continue;

    // 通知対象者情報の更新
    exsistingSettings?.value?.forEach((item) => {

      if (item.value.alertTargetId.value === room.agentId) {
        item.value.alertTargetName.value = room.agentName;
        item.value.chatworkRoomId.value = room.cwRoomId;
        chkFlg = true;
      }
    });

    // 通知対象者の追加
    if (!chkFlg) {
      exsistingSettings?.value?.push({
        id: '',
        value: {
          chatworkRoomId: { value: room.cwRoomId },
          alertTargetId: { value: room.agentName },
          alertTargetName: { value: room.agentId },
        },
      });
    }
  }


  // 不要な通知対象者を削除
  for (let i = 0; i < exsistingSettings?.value?.length; i++) {
    let chkFlg = false;
    updateSettings.forEach(({ agentId }) => {
      if (agentId === exsistingSettings.value[i].value.alertTargetId.value) {
        chkFlg = true;
      }
    });

    if (!chkFlg) {
      exsistingSettings.value.splice(i, 1);
    }
  }

  return exsistingSettings;
};
