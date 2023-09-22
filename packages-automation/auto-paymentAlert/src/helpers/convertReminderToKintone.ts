import format from 'date-fns/format';
import { PaymentReminder } from '../../types/paymentReminder';
import { AddPaymentReminder } from '../api-kintone/addPaymentReminder';



export const convertReminderToKintone = ({
  paymentReminderJson,
}: {
  paymentReminderJson: PaymentReminder[]
}) => {

  const kintoneData: AddPaymentReminder[] = paymentReminderJson.map(({
    andpadPaymentUrl,
    contractDate,
    contractId,
    cwRoomIds,
    projId,
    projName,
    projType,
    // reminderUrl, このタイミングでは設定されていないため、使用しない
    territory,
    totalContractAmount,
    expectedPaymentDate,
  }) => {

    const cwRoomIdsKintone = cwRoomIds.map(({ agentName, agentId, cwRoomId }) => {
      return ({
        value: {
          chatworkRoomId: cwRoomId,
          alertTargetId: agentId,
          alertTargetName: agentName,
        },
      });

    });

    return ({
      area: { value: territory },
      projId: { value: projId },
      contractDate: { value: contractDate ?? '' },
      expectedPaymentDate: { value: expectedPaymentDate ?? '' },
      projType: { value: projType },
      projName: { value: projName },
      alertDate: { value: format(new Date(), 'yyyy-MM-dd') },
      andpadStatus: { value: '未確認' },
      //lastAlertDate: { value: '' }, //このタイミングではまだ通知はしていないため登録しない
      totalContractAmount: { value: totalContractAmount },
      andpadUrl: { value: andpadPaymentUrl },
      contractId: { value: contractId },
      alertState: { value: '1' },
      //reminderDate: { value: '' }, //再通知日はこのタイミングでは設定しない
      notificationSettings: {
        value: cwRoomIdsKintone,
      },
    });
  });

  return kintoneData;

};
