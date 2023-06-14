import { addressBuilder } from 'libs';
import { ICustomers, TContact } from 'types';

export const groupCustContacts = (rec: ICustomers[]) => {
  return rec.reduce(
    (acc, { fullName, fullNameReading, contacts, postalCode, address1, address2  }) => {
      
      for (const { value: { contactType, contactValue, relation } } of contacts.value) {
        const cT  = contactType.value as TContact;
        if (contactValue.value) {
          if (cT === 'email') {
            acc.custEmails.push(contactValue.value);
          } else if (cT === 'tel') {
            acc.custTels.push(`${contactValue.value}${relation.value ? `（${relation.value}）` : ''}`);
          }
        }
      }

      const address = addressBuilder({
        postal: postalCode.value,
        address1: address1.value,
        address2: address2.value,
      });

      acc.addresses.push(address);
      acc.fullNames.push(fullName.value);
      acc.fullNameReadings.push(fullNameReading.value);

      return acc;
    },
    {
      fullNames: [] as string[],
      fullNameReadings: [] as string[],
      addresses: [] as string[],
      custEmails: [] as string[],
      custTels: [] as string[],
    },
  );
};