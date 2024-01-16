import { IInvoiceReminder, chatworkRooms } from '../../../auto-invoiceAlert/config';
import { CwRoomIds } from '../../types/InvoiceReminder';



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

  const newSettings = existingSettings.value.reduce((acc, cur) => {

    //console.log('acc', JSON.stringify(acc, null, 2));
    const updateSetting = updateSettings.find(({ agentId }) => cur.value.alertTargetId.value === agentId);

    if (updateSetting) {// 通知先情報の更新
      acc.value.push({
        id: cur.id,
        value: {
          chatworkRoomId: { value: updateSetting.cwRoomId },
          alertTargetName: { value: updateSetting.agentName },
          alertTargetId: { value: updateSetting.agentId },
        },
      });
    } else {
      // 通知先の削除 -> 処理なし      
    }
    return acc;

  }, {
    type: 'SUBTABLE',
    value:[],
  } as IInvoiceReminder['notificationSettings']);


  // 追加されている通知先がないか確認する
  updateSettings.forEach((updateSetting) => {

    // cocoasGroupが設定されている場合は、通知先の取得に失敗しているため、対象外
    if (updateSetting.cwRoomId === chatworkRooms.cocoasGroup) return newSettings;

    const isExist = newSettings.value
      .find(({ value: { alertTargetId } }) => alertTargetId.value === updateSetting.agentId);

    if (!isExist) {
      newSettings.value.push({
        id: '',
        value: {
          alertTargetId: { value: updateSetting.agentId },
          alertTargetName: { value: updateSetting.agentName },
          chatworkRoomId: { value: updateSetting.cwRoomId },
        },
      });
    }

    return newSettings;

  });

  return newSettings;

};
