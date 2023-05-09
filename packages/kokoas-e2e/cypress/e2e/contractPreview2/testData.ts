// import faker
import { faker } from '@faker-js/faker';

export const correctInputData = () => {
  const minTotalContractAmt = 100000;
  const maxTotalContractAmt = 10000000;
  const totalContractAmt = faker.datatype.number({ min: minTotalContractAmt, max: maxTotalContractAmt, precision: 1000 });
  return ({ 
    totalContractAmt,
    totalProfit: faker.datatype.number({ min: minTotalContractAmt / 2, max: totalContractAmt / 2, precision: 1000 }),
  });
};