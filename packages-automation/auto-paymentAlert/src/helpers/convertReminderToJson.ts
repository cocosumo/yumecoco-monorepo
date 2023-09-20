import { PaymentReminderRecordType } from '../../config';
import { PaymentReminder } from '../../types/paymentReminder';

export const convertReminderToJson = ({
  reminder,
}: {
  reminder: PaymentReminderRecordType[]
}) => {

  return reminder.map(({
    andpadUrl,
    area,
    contractId,
    projId,
    projType,
    projName,
    contractDate,
    totalContractAmount,
    alertTarget,
  }) => {

    return ({
      andpadPaymentUrl: andpadUrl.value,
      contractId: contractId.value,
      projId: projId.value,
      projType: projType.value,
      projName: projName.value,
      contractDate: contractDate.value,
      territory: area.value,
      totalContractAmount: totalContractAmount.value,
      alertTarget: alertTarget.value,
    }) as PaymentReminder;
  });

};