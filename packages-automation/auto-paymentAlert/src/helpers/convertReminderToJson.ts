import { PaymentReminderRecordType } from '../../config';
import { PaymentReminder } from '../../types/paymentReminder';

export const convertReminderToJson = ({
  reminder,
}: {
  reminder: PaymentReminderRecordType[]
}) => {

  return reminder.map(({
    contractId,
    projId,
    projType,
    totalContractAmount,
    alertTarget,
  }) => {

    return ({
      contractId: contractId.value,
      projId: projId.value,
      projType: projType.value,
      totalContractAmount: totalContractAmount.value,
      alertTarget: alertTarget.value,
    }) as PaymentReminder;
  });

};