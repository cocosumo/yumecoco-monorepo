import { UpdateUnissuedInvAlertId } from 'api-kintone/src/unissuedInvoiceAlert/updateUnissuedInvoiceAlert';
import addWeeks from 'date-fns/addWeeks';
import format from 'date-fns/format';
import { IUnissuedinvoicealert } from 'types';



export const convertReminderToKintone = ({
  recReminders,
}: {
  recReminders: IUnissuedinvoicealert[]
}) => {

  const updateRecords: UpdateUnissuedInvAlertId[] = recReminders.map(({
    $id,
  }) => {
    return ({
      id: $id.value,
      record: {
        lastAlertDate: { value: format(new Date(), 'yyyy-MM-dd') },
        scheduledAlertDate: { value: format(addWeeks(new Date(), 1), 'yyyy-MM-dd') },
      },
    });
  });

  return updateRecords;

};
