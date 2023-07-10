import { TypeOfForm } from '../form';
import { ContractRow } from '../hooks/useFilteredContracts';

/** 数字をソートする */
const sortNumber = (a: number, b: number, desc: boolean) =>
  desc ? b - a : a - b;

export const itemsSorter = ({
  order,
  orderBy,
}:{
  order: TypeOfForm['order']
  orderBy: keyof ContractRow
}) =>
  (a: ContractRow, b: ContractRow) => {
    const asc = order === 'asc';

    switch (orderBy) {
      case 'contractAmount':
      case 'grossProfit':
      case 'profitRate':
        return sortNumber(a[orderBy] as number, b[orderBy] as number, !asc);

      default :
        return asc
          ?  (a[orderBy]).localeCompare((b[orderBy]))
          :  (b[orderBy]).localeCompare((a[orderBy]));
    }
  };


