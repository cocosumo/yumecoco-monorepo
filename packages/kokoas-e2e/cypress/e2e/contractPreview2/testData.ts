// import faker
import { faker } from '@faker-js/faker';
import { calculateAmount, Values } from 'libs';



export const correctInputData = () => {
  const minTotalContractAmt = 100000;
  const maxTotalContractAmt = 10000000;
  const totalContractAmt = faker.datatype.number({ min: minTotalContractAmt, max: maxTotalContractAmt, precision: 1000 });
  return ({ 
    totalContractAmt,
    totalProfit: faker.datatype.number({ min: minTotalContractAmt / 2, max: totalContractAmt / 2, precision: 1000 }),
  });
};

export const inputData = calculateAmount({
  amountAfterTax: 33333,
  profit: 1000,
});

export const labelMap: Record<keyof Values, string> = {
  amountAfterTax: '契約合計金額（税込）',
  amountBeforeTax: '契約合計金額（税抜）',
  profit: '粗利額 （税抜）',
  costPrice: '原価',
  profitRate: '粗利率',
  taxRate: '税率',
};


export const testProjId = '5a5e6cae-bea3-48e9-b679-3dcbbcc7fc60';