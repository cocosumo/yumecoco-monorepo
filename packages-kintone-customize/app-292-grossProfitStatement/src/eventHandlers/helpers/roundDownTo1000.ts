import { Big } from 'big.js';


/** 1000未満を切り捨てる */
export const roundDownTo1000 = (amount: number) => {
  const bigAmount = new Big(amount);
  const roundedAmount = bigAmount.div(1000)
    .round(0, 0)
    .times(1000);

  return roundedAmount.toNumber();
};
