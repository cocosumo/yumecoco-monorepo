import { isPast } from 'date-fns';
import { IInvoiceReminder } from '../../config';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { UpdateInvoiceReminder } from '../api-kintone';
import { compileNotificationSettings } from './compileNotificationSettings';
import { convAlertDate } from './convAlertDate';



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
    expectedPaymentDate,
    lastAlertDate: lastAlertDatePrev,
  }) => {

    //リマインダーレコードから　notificationSettings　を取得する
    const notificationSettingsRec = existedReminder.find(({
      projId: reminderProjId,
    }) => projId === reminderProjId.value) || {} as IInvoiceReminder;

    const updateRooms = compileNotificationSettings({
      existingSettings: notificationSettingsRec.notificationSettings,
      updateSettings: cwRoomIds,
    });

    const updateAlertDate = convAlertDate({
      scheduledAlertDate: alertDate,
      expectedPaymentDate: expectedPaymentDate,
    });

    const isAlerted = alertState && (!!expectedPaymentDate && isPast(new Date(expectedPaymentDate)));

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
        scheduledAlertDate: { value: updateAlertDate },
        alertState: { value: alertState ? '1' : '0' },
        andpadUrl: { value: andpadInvoiceUrl },
        store: { value: storeName },
        area: { value: territory },
        projName: { value: projName },
        lastAlertDate: { value: isAlerted ? lastAlertDate : lastAlertDatePrev },
        contractId: { value: contractId },
        notificationSettings: updateRooms,
        systemId: { value: systemId },
      },
    });
  });

  return kintoneData;

};
