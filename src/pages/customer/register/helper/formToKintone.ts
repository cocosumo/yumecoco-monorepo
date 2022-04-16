import { CustomerForm } from '../form';

export const formToKintCust = (formData: CustomerForm): Array<Partial<CustomerTypes.SavedData>>  => {
  const {
    customers,
  } = formData;

  console.log(customers);

  return customers
    .map(({
      id,
      custName, custNameReading, gender, birthYear, birthMonth, birthDay,
      postal, address1, address2, phone1, phone1Rel, phone2, phone2Rel,
      email, emailRel, isSameAddress, 
    }, index )=> {

      let deps = {
        postal,
        address1,
        address2,
        phone1, phone1Rel,
        phone2, phone2Rel,
        email, emailRel,
      };

      if (isSameAddress){
        const mainCust =  customers[0];
        Object.keys(deps).forEach((key : keyof typeof deps) => {
          deps[key] = mainCust[key];
        });
      }

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
        isSameAsMain: { value: (+isSameAddress).toString() },
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

export const formToKintConst = (formData: CustomerForm, customerIds: { id: string, revision: string }[] | [] = []): Partial<ConstructionDetails.SavedData> => {
  const {
    store,
    cocoAG1,
    cocoAG2,
    yumeAG1,
    yumeAG2,
  } = formData;

  console.log('transformedForm', formData);

  /* Only include specified agents */
  const agents = Object.entries({
    cocoAG1,
    cocoAG2,
    yumeAG1,
    yumeAG2,
  }).reduce((accu, [key, value]) => {
    if (value){
      return [...accu, [key.replace(/\d+/g, ''), value]];
    }
    return accu;
  }, [] as Array<[string, string]>);


  return {
    storeId: { value: store },
    members: {
      type: 'SUBTABLE',
      value: customerIds?.map(({ id }) => {
        return {
          id: '',
          value: {
            customerId: { value: id },
            address: { value: '' }, // lookup copy field
            customerName: { value: '' }, // lookup copy field
          },
        };
      }) || [],
    },
    agents: {
      type: 'SUBTABLE',
      value: agents?.map(([type, value])=>{
        return {
          id: '',
          value: {
            agentType: { value: type },
            employeeId: { value: value },
            employeeName: { value: '' }, // lookup copy field
          },
        };
      }) || [],
    },
  };
};