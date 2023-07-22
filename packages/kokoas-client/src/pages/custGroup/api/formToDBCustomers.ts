import { ICustomers } from 'types';
import { TForm } from '../schema';

export const formToDBCustomers = (formData: TForm): Array<Partial<ICustomers>>  => {
  const {
    customers,
  } = formData;

  return customers
    .map(({
      custId,
      custName, custNameReading, gender, birthYear, birthMonth, birthDay,
      postal, address1, address2, phone1, phone1Rel, phone2, phone2Rel,
      email, emailRel, isSameAddress,
    }, index )=> {

      const mainCust =  customers[0];

      const deps = {
        postal : isSameAddress ? mainCust.postal : postal,
        address1 : isSameAddress ? mainCust.address1 : address1,
        address2: isSameAddress ? mainCust.address2 : address2,
      };

      return {
        uuid: { value: custId },
        index: { value: index.toString() },
        fullName: { value: custName },
        fullNameReading: { value: custNameReading },
        postalCode: { value: deps.postal },
        address1: { value: deps.address1 },
        address2: { value: deps.address2 },
        gender: { value: gender },
        birthYear: { value: birthYear },
        birthMonth: { value: birthMonth },
        birthDay: { value: birthDay },
        isSameAsMain: { value: (index === 0 ? 0 : +isSameAddress).toString() }, // 0 or 1, mainCustomer always 0/false
        contacts: {
          type: 'SUBTABLE',
          value: [
            ['tel', phone1, phone1Rel],
            ['tel', phone2, phone2Rel],
            ['email', email, emailRel],
          ]
            .map(([type, val, rel]) => ({
              id: '',
              value: {
                contactValue: { value: val || '' },
                contactType: { value: type || '' },
                relation: { value: rel || '' },
              },
            })),

        },
      };

    });
};