import { IInvoiceReminder } from '../../config';
import { CwRoomIds } from '../../types/InvoiceReminder';



export const compileNotificationSettings = ({
  exsistingSettings,
  updateSettings,
}: {
  exsistingSettings: IInvoiceReminder['notificationSettings'],
  updateSettings: CwRoomIds[],
}) => {

  for (const room of updateSettings) {
    let chkFlg = false;

    // 通知対象者情報の更新
    exsistingSettings.value.forEach((item) => {
      if (item.value.alertTargetId.value === room.agentId) {
        item.value.alertTargetName.value = room.agentName;
        item.value.chatworkRoomId.value = room.cwRoomId;
        chkFlg = true;
      }
    });

    // 通知対象者の追加
    if (!chkFlg) {
      exsistingSettings.value.push({
        id: '',
        value: {
          chatworkRoomId: { value: room.cwRoomId },
          alertTargetId: { value: room.agentName },
          alertTargetName: { value: room.agentId },
        },
      });
    }
  }

  for (let i = 0; i < exsistingSettings.value.length; i++) {
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
