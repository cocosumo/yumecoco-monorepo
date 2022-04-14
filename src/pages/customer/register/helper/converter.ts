import { CustomerForm } from '../form';

export const formToKintCust = (formData: CustomerForm): Array<Partial<CustomerTypes.SavedData>>  => {
  const {
    customers,
  } = formData;

  return customers
    .map(({
      custName, custNameReading, gender, birthYear, birthMonth, birthDay,
      postal, address1, address2, phone1, phone1Type, phone2, phone2Type,
      email, emailType, isSameAddress,
    } )=> {

      let deps = {
        postal,
        address1,
        address2,
        phone1, phone1Type,
        phone2, phone2Type,
        email, emailType,
      };

      if (isSameAddress){
        const mainCust =  customers[0];
        Object.keys(deps).forEach((key : keyof typeof deps) => {
          deps[key] = mainCust[key];
        });
      }

      return {
        fullName: { value: custName },
        fullNameReading: { value: custNameReading },
        postalCode: { value: deps.postal },
        address1: { value: deps.address1 },
        address2: { value: deps.address2 },
        gender: { value: gender },
        birthYear: { value: birthYear },
        birthMonth: { value: birthMonth },
        birthDay: { value: birthDay },
        contacts: {
          type: 'SUBTABLE',
          value: [
            ['tel', deps.phone1, deps.phone1Type],
            ['tel', deps.phone2, deps.phone2Type],
            ['email', deps.email, deps.emailType],
          ]
            .map(([type, val, classif]) => ({
              id: '',
              value: {
                contactValue: { value: val },
                contactType: { value: type },
                classification: { value: classif },
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
  }, []);

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


export const formToKintone = (formData: CustomerForm) => {
  return {
    members: formToKintCust(formData),
    groups: formToKintConst(formData),
  };
};