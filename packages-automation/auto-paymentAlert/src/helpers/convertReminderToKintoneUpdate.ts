import { PaymentReminder } from '../../types/paymentReminder';
import { UpdatePaymentReminder } from '../api-kintone';



export const convertReminderToKintoneUpdate = ({
  paymentReminderJson,
  lastPaymentDate,
  alertDate,
}: {
  paymentReminderJson: PaymentReminder[]
  lastPaymentDate: string
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
    reminderUrl,
    territory,
    totalContractAmount,
  }) => {

    return ({
      updateKey: {
        field: 'contractId',
        value: contractId,
      },
      record: {
        andpadPaymentUrl: { value: andpadPaymentUrl },
        contractDate: { value: contractDate },
        contractId: { value: contractId },
        cwRoomIds: { value: cwRoomIds },
        projId: { value: projId },
        projName: { value: projName },
        projType: { value: projType },
        reminderUrl: { value: reminderUrl },
        territory: { value: territory },
        totalContractAmount: { value: totalContractAmount },

        lastPaymentDate: { value: lastPaymentDate },
        alertDate: { value: alertDate },
      },
    });
  });

  return kintoneData;

};
