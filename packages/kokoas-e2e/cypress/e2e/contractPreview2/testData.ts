// import faker
import { faker } from '@faker-js/faker';

export const correctInputData = () => {

  const maxTotalContractAmt = 10000000;
  
  return ({ 
    totalContractAmt: faker.datatype.number({ min: 100000, max: maxTotalContractAmt, precision: 1000 }),
    totalProfit: faker.datatype.number({ min: 100000, max: maxTotalContractAmt, precision: 1000 }),
  });
};