import { IAndpadpayments } from 'types';
import { IPaymentreminder } from '../dbKintone';




export const convertReminders = ({
  reminders,
  andpadPayments,
}: {
  reminders: IPaymentreminder[]
  andpadPayments: IAndpadpayments[]
}) => {

  const updateReminders = reminders.map(({
    projId: reminderProjId,
    paymentTable,
  }) => {

    // 入金情報が更新されていれば、サブテーブルを更新する
    andpadPayments.filter(({ projId }) => projId.value === reminderProjId.value)
      .forEach(({
        ID,
        andpadProjName,
        paymentType,
        expectedPaymentDate,
        paymentDate,
      }) => {

        const tgtSubTtable = paymentTable.value.find(
          ({ value: { andpadId } }) => andpadId.value === ID.value,
        );




      });

    // １度でも入金があれば、[alertState]を[0]にし、次のレコードに処理を移す
    // (1度も入金なしの物に対して)通知開始日を設定する ->　物件種別ごとに変わるため、要設定

  });
};