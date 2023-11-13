import { IInvoiceReminder } from '../../config';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { UpdateInvoiceReminder } from '../api-kintone';
import { compileNotificationSettings } from './compileNotificationSettings';



/**
 * アラート通知後の、請求書用リマインダーアプリ更新用データを作成します
 * @param param0 
 * @returns 
 */
export const convertReminderToKintoneUpdate = ({
  invoiceReminderJson,
  lastAlertDate,
  alertDate,
  existedReminder,
}: {
  invoiceReminderJson: InvoiceReminder[]
  lastAlertDate: string
  alertDate: string
  existedReminder: IInvoiceReminder[]
}) => {

  const kintoneData: UpdateInvoiceReminder[] = invoiceReminderJson.map(({
    contractDate,
    contractId,
    cwRoomIds,
    projId,
    projName,
    projType,
    territory,
    totalContractAmount,
    alertState,
    yumeAG,
    systemId,
    storeName,
    andpadInvoiceUrl,
  }) => {

    //リマインダーレコードから　notificationSettings　を取得する
    const notificationSettingsRec = existedReminder.map(({ notificationSettings }) => notificationSettings);

    const updateRooms = compileNotificationSettings({
      exsistingSettings: notificationSettingsRec,
      updateSettings: cwRoomIds,

    });


    return ({
      updateKey: {
        field: 'projId',
        value: projId,
      },
      record: {
        //projId: { value: projId }, //updatekeyに指定した値は更新できないため、対象外とする
        contractDate: { value: contractDate },
        yumeAG: { value: yumeAG },
        projType: { value: projType },
        totalContractAmount: { value: totalContractAmount },
        scheduledAlertDate: { value: alertDate },
        alertState: { value: alertState ? '1' : '0' },
        andpadUrl: { value: andpadInvoiceUrl },
        store: { value: storeName },
        area: { value: territory },
        projName: { value: projName },
        lastAlertDate: { value: lastAlertDate },
        contractId: { value: contractId },
        notificationSettings: updateRooms,
        systemId: { value: systemId },
      },
    });
  });

  return kintoneData;

};
