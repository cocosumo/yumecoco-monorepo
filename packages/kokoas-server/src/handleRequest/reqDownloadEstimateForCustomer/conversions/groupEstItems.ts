import { IProjestimates } from 'types';

export const groupEstItems  = (estItems: IProjestimates['内訳']['value']) => {

  const groupedEstItems = estItems
    .reduce<Record<string, {
    value: number,
    items: IProjestimates['内訳']['value'][number]['value'][],
  }>>(
    (acc, curr) => {
      acc.aaa.value = curr;
      return acc;
    }, 
    {},
  );

  return groupedEstItems;
};