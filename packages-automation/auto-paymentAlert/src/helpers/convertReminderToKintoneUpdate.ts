import { PaymentReminder } from '../../types/paymentReminder';
import { UpdatePaymentReminder } from '../api-kintone';



export const convertReminderToKintoneUpdate = ({
  paymentReminderJson,
  lastAlertDate,
  alertDate,
}: {
  paymentReminderJson: PaymentReminder[]
  lastAlertDate: string
  alertDate: string
}) => {

  const kintoneData: UpdatePaymentReminder[] = paymentReminderJson.map(({
    andpadPaymentUrl,
    contractDate,
    contractId,
    cwRoomIds,
    projId,
    projName,
    projType,
    territory,
    totalContractAmount,
    alertState,
    expectedPaymentDate,
  }) => {

    return ({
      updateKey: {
        field: 'projId',
        value: projId,
      },
      record: {
        andpadPaymentUrl: { value: andpadPaymentUrl },
        alertState: { value: alertState ? '1' : '0' },
        lastAlertDate: { value: lastAlertDate },
        scheduledAlertDate: { value: alertDate },
        //reminderDate: { value: format(addDays(new Date(), 1), 'yyyy-MM-dd')},
        contractId: { value: contractId },
        projId: { value: projId },
        projType: { value: projType },
        projName: { value: projName },
        territory: { value: territory },
        contractDate: { value: contractDate },
        totalContractAmount: { value: totalContractAmount },
        expectedPaymentDate: { value: expectedPaymentDate },
        andpadStatus: { value: alertState ? '' : '実績あり' },
        cwRoomIds: { value: cwRoomIds },
      },
    });
  });

  return kintoneData;

};
