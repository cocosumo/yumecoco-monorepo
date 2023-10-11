import format from 'date-fns/format';
import { PaymentReminder } from '../../types/paymentReminder';
import { IPaymentReminder } from '../../config';



export const convertReminderToKintone = ({
  paymentReminderJson,
}: {
  paymentReminderJson: PaymentReminder[]
}) => {

  const kintoneData: Partial<IPaymentReminder>[] = paymentReminderJson.map(({
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
      expectedPaymentDate: { value: expectedPaymentDate ?? '' },
      projType: { value: projType },
      totalContractAmount: { value: totalContractAmount },
      scheduledAlertDate: { value: format(new Date(), 'yyyy-MM-dd') },
      alertState: { value: '1' },
      //reminderDate: { value: '' }, //再通知日はこのタイミングでは設定しない
      andpadDepositAmount: { value: '0' }, //TODO string ->numberに合わせて、要処理修正
      area: { value: territory },
      projName: { value: projName },
      //lastAlertDate: { value: '' }, //このタイミングではまだ通知はしていないため登録しない
      andpadUrl: { value: andpadPaymentUrl },
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
