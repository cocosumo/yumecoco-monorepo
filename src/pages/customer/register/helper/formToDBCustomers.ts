import { CustomerForm } from '../form';

export const formToDBCustomers = (formData: CustomerForm): Array<Partial<CustomerTypes.SavedData>>  => {
  const {
    customers,
  } = formData;

  return customers
    .map(({
      id,
      custName, custNameReading, gender, birthYear, birthMonth, birthDay,
      postal, address1, address2, phone1, phone1Rel, phone2, phone2Rel,
      email, emailRel, isSameAddress,
    }, index )=> {

      const mainCust =  customers[0];

      const deps = {
        postal : isSameAddress ? mainCust.postal : postal,
        address1 : isSameAddress ? mainCust.address1 : address1,
        address2: isSameAddress ? mainCust.address2 : address2,
        phone1: isSameAddress ? '' : phone1,
        phone1Rel: isSameAddress ? '' : phone1Rel,
        phone2: isSameAddress ? '' : phone2,
        phone2Rel: isSameAddress ? '' : phone2Rel,
        email: isSameAddress ? '' : email,
        emailRel: isSameAddress ? '' : emailRel,
      };


      return {
        $id: {
          type: '__ID__',
          value: id,
        },
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
            ['tel', deps.phone1, deps.phone1Rel],
            ['tel', deps.phone2, deps.phone2Rel],
            ['email', deps.email, deps.emailRel],
          ]
            .map(([type, val, rel]) => ({
              id: '',
              value: {
                contactValue: { value: val },
                contactType: { value: type },
                relation: { value: rel },
              },
            })),

        },
      };

    });
};