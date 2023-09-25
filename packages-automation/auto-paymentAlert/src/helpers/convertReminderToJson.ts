import { kintoneBaseUrl } from 'api-kintone';
import { IPaymentReminder, reminderAppId } from '../../config';
import { CwRoomIds, PaymentReminder } from '../../types/paymentReminder';
//import { IAndpadpayments } from 'types';



export const convertReminderToJson = ({
  reminder,
  //andpadPayments, // TODO
}: {
  reminder: IPaymentReminder[]
  //andpadPayments: IAndpadpayments[],
}) => {

  return reminder.map(({
    $id,
    andpadUrl,
    area,
    contractId,
    projId,
    projType,
    projName,
    contractDate,
    totalContractAmount,
    notificationSettings,
  }) => {

    const cwRoomIds = notificationSettings.value.map(({ value }) => {
      const {
        alertTargetId,
        alertTargetName,
        chatworkRoomId,
      } = value;

      return {
        agentName: alertTargetName.value,
        agentId: alertTargetId.value,
        cwRoomId: chatworkRoomId.value,
      } as CwRoomIds;
    });


    const reminderUrl = `${kintoneBaseUrl}/k/${reminderAppId}/show#record=${$id.value}`;

    return ({
      andpadPaymentUrl: andpadUrl.value,
      reminderUrl: reminderUrl,
      contractId: contractId.value,
      projId: projId.value,
      projName: projName.value,
      projType: projType.value,
      contractDate: contractDate.value,
      totalContractAmount: totalContractAmount.value,
      territory: area.value,
      cwRoomIds: cwRoomIds,
    }) as PaymentReminder;
  });

};