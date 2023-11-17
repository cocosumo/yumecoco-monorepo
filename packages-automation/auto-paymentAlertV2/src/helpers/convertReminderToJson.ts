import { IPaymentReminder } from '../../config';
import { PaymentReminder } from '../../types/paymentReminder';
import { IAndpadpayments, IProjects, Territory } from 'types';
import { getAllAndpadOrders } from 'api-andpad';
import { compileInfoFromSystemId } from './compileInfoFromReminder';



export const convertReminderToJson = ({
  reminders,
  andpadPayments,
  allAndpadOrders,
  allProjects,
}: {
  reminders: IPaymentReminder[]
  andpadPayments: IAndpadpayments[],
  allAndpadOrders: Awaited<ReturnType<typeof getAllAndpadOrders>>
  allProjects: IProjects[]
}) => {

  return reminders.map((reminder): PaymentReminder => {
    const {
      andpadUrl,
      area,
      contractId,
      projId,
      projType,
      projName,
      contractDate,
      totalContractAmount,
      expectedPaymentDate,
      expectedPaymentAmt,
      yumeAG,
      paymentId,
      paymentType,
      systemId,
      store,
    } = reminder;

    const {
      connectedToAndpad,
      hasPaymentHistory,
      reminderUrl,
      cwRoomIds,
    } = compileInfoFromSystemId({
      allAndpadOrders,
      allProjects,
      andpadPayments,
      reminder,
    });


    return ({
      alertState: connectedToAndpad && !hasPaymentHistory,
      systemId: systemId.value,
      paymentId: paymentId.value,
      andpadPaymentUrl: andpadUrl.value,
      reminderUrl: reminderUrl,
      contractId: contractId.value,
      projId: projId.value,
      projName: projName.value,
      projType: projType.value,
      storeName: store.value,
      contractDate: contractDate.value,
      territory: area.value as Territory,
      expectedPaymentDate: expectedPaymentDate.value,
      expectedPaymentAmt: expectedPaymentAmt.value,
      paymentType: paymentType.value,
      yumeAG: yumeAG.value,
      cwRoomIds: cwRoomIds,
      totalContractAmount: totalContractAmount.value,
    });
  });

};