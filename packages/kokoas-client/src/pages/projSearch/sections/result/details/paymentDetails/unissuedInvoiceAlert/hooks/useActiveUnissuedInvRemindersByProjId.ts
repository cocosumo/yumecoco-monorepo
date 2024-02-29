import { useActiveUnissuedInvReminders } from 'kokoas-client/src/hooksQuery';


export const useActiveUnissuedInvRemindersByProjId = (projId: string) => {

  const { data: allUnissuedInvReminders } = useActiveUnissuedInvReminders();
  const recUnissuedInvReminders = allUnissuedInvReminders
    ?.filter(({ projId: projIdReminder }) => projIdReminder.value === projId);

  return recUnissuedInvReminders;
};
