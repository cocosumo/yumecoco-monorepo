import { IInvoiceReminder } from '../../../auto-invoiceAlert/config';
import { chatworkRooms } from '../../config';
import { CwRoomIds } from '../../types/paymentReminder';



/**
 * kintoneの通知対象者を更新します
 * @param param.existingSettings 既存の通知先
 * @param param.updateSettings 最新の通知先
 * @returns IInvoiceReminder['notificationSettings']型で最新の通知先を返す
 */
export const compileNotificationSettings = ({
  existingSettings,
  updateSettings,
}: {
  existingSettings: IInvoiceReminder['notificationSettings'],
  updateSettings: CwRoomIds[],
}) => {

  // Create a copy of existingSettings
  const updatedSettings = existingSettings ? [...existingSettings.value] : [];

  for (const room of updateSettings) {

    // cocoasGroupが設定されている場合は、通知先の取得に失敗しているため、対象外
    if (room.cwRoomId === chatworkRooms.cocoasGroup) continue;

    const existingSetting = updatedSettings.find(item => item.value.alertTargetId.value === room.agentId);

    if (existingSetting) {
      // Update existing setting
      existingSetting.value.alertTargetName.value = room.agentName;
      existingSetting.value.chatworkRoomId.value = room.cwRoomId;
    } else {
      // Add new setting
      updatedSettings.push({
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
  for (const updatedSetting of updatedSettings) {
    const isExist = updateSettings.some(({ agentId }) =>
      agentId === updatedSetting.value.alertTargetId.value);

    if (!isExist) {
      updatedSetting.value.alertTargetId.value = '';
    }
  }


  return ({
    type: 'SUBTABLE',
    value: updatedSettings.filter(({ value: { alertTargetId } }) => alertTargetId.value !== ''),
  }) as IInvoiceReminder['notificationSettings'];
};
