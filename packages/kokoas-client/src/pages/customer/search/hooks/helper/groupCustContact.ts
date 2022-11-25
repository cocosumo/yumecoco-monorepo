import { ICustomers, TContact } from 'types';

export const groupCustContacts = (rec: ICustomers[]) => {
  return rec.reduce(
    (acc, { contacts }) => {
      for (const { value: { contactType, contactValue } } of contacts.value) {
        const cT  = contactType.value as TContact;
        if (contactValue.value) {
          if (cT === 'email') {
            acc.custEmails.push(contactValue.value);
          } else if (cT === 'tel') {
            acc.custTels.push(contactValue.value);
          }
        }
      }

      return acc;
    },
    {
      custEmails: [] as string[],
      custTels: [] as string[],
    },
  );
};