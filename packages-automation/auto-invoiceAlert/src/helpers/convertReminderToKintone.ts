import format from 'date-fns/format';
import { InvoiceReminder } from '../../types/InvoiceReminder';
import { IInvoiceReminder } from '../../config';


/**
 * 請求リマインダーアプリ用データへ変換する
 * 本関数は契約書からアラート対象を取得時に呼び出されることを想定しているため
 * 通知予定日は当日を設定する
 * @param param0 invoiceReminderJson: 請求リマインダーデータ配列
 * @returns 請求リマインダーアプリ用レコード
 */
export const convertReminderToKintone = ({
  invoiceReminderJson,
}: {
  invoiceReminderJson: InvoiceReminder[]
}) => {

  const kintoneData: Partial<IInvoiceReminder>[] = invoiceReminderJson.map(({
    andpadInvoiceUrl,
    contractDate,
    contractId,
    cwRoomIds,
    projId,
    projName,
    projType,
    // reminderUrl, このタイミングでは設定されていないため、使用しない
    territory,
    totalContractAmount,
    yumeAG,
  }) => {

    const cwRoomIdsKintone = cwRoomIds.map(({ agentName, agentId, cwRoomId }) => {
      return ({
        id: '',
        value: {
          chatworkRoomId: { value: cwRoomId },
          alertTargetId: { value: agentId },
          alertTargetName: { value: agentName },
        },
      });

    });

    return ({
      projId: { value: projId },
      contractDate: { value: contractDate ?? '' },
      expectedCreateInvoiceDate: { value: '' },
      projType: { value: projType },
      totalContractAmount: { value: totalContractAmount || '' },
      scheduledAlertDate: { value: format(new Date(), 'yyyy-MM-dd') },
      alertState: { value: '1' },
      //reminderDate: { value: '' }, //再通知日はこのタイミングでは設定しない
      andpadDepositAmount: { value: '0' }, //TODO string ->numberに合わせて、要処理修正
      area: { value: territory },
      projName: { value: projName },
      //lastAlertDate: { value: '' }, //このタイミングではまだ通知はしていないため登録しない
      andpadUrl: { value: andpadInvoiceUrl },
      contractId: { value: contractId },
      yumeAG: { value: yumeAG },
      notificationSettings: {
        type: 'SUBTABLE',
        value: cwRoomIdsKintone,
      },
    });
  });

  return kintoneData;

};
