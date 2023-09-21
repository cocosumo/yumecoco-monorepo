import { ICustomers } from 'types';


export const groupCustContacts = (rec: ICustomers[]) => {
  return rec.reduce(
    (acc, { fullName, fullNameReading  }) => {
    
      acc.fullNames.push(fullName.value);
      acc.fullNameReadings.push(fullNameReading.value);

      return acc;
    },
    {
      fullNames: [] as string[],
      fullNameReadings: [] as string[],
    },
  );
};