import { IContracts } from 'types';



export const sortContracts = (contracts: IContracts[]) => {
  if (!contracts) return contracts;

  const sortedContracts = contracts.sort((a, b) => {
    return new Date(a.contractDate.value).getTime() - new Date(b.contractDate.value).getTime();
  });

  return sortedContracts;

};
