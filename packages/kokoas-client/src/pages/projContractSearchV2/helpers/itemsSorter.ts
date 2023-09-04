import { ContractRow, KContractRow } from '../hooks/useFilteredContracts';
import { TForm } from '../schema';

/** 数字をソートする */
const sortNumber = (a: number, b: number, desc: boolean) =>
  desc ? b - a : a - b;

export const itemsSorter = ({
  order,
  orderBy,
}:{
  order: TForm['order']
  orderBy: KContractRow
}) =>
  (a: ContractRow, b: ContractRow) => {
    const asc = order === 'asc';

    switch (orderBy) {
      case 'contractAmount':
      case 'grossProfit':
      case 'refundAmt':
      case 'reductionAmt':
      case 'subsidyAmt':
      case 'profitRate':
        return sortNumber(a[orderBy] as number, b[orderBy] as number, !asc);

      default :
        return asc
          ?  (a[orderBy]).localeCompare((b[orderBy]))
          :  (b[orderBy]).localeCompare((a[orderBy]));
    }
  };


