import { InvoiceReminder } from '../../types/InvoiceReminder';
import { UpdateInvoiceReminder } from '../api-kintone';



/**
 * アラート通知後の、請求書用リマインダーアプリ更新用データを作成します
 * @param param0 
 * @returns 
 */
export const convertReminderToKintoneUpdate = ({
  invoiceReminderJson,
  lastAlertDate,
  alertDate,
}: {
  invoiceReminderJson: InvoiceReminder[]
  lastAlertDate: string
  alertDate: string
}) => {

  const kintoneData: UpdateInvoiceReminder[] = invoiceReminderJson.map(({
    contractDate,
    contractId,
    //cwRoomIds,
    projId,
    projName,
    projType,
    territory,
    totalContractAmount,
    alertState,
    yumeAG,
    systemId,
  }) => {

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
        // reminderDate: { value: '' }, ユーザーがプルダウンから選択するため、対象外とする
        // andpadDepositAmount: { value: '0' },
        area: { value: territory },
        projName: { value: projName },
        lastAlertDate: { value: lastAlertDate },
        contractId: { value: contractId },
        // notificationSettings: {}, // 通知対象の更新処理は不要？実装要検討
        systemId: { value: systemId },
      },
    });
  });

  return kintoneData;

};
