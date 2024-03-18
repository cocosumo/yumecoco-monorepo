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

    if (!orderBy) {
      const aa = a.contractStatus as string === 'completed';
      const bb = b.contractStatus as string === 'completed';

      // 完了 should be at the bottom, and empty should be at the top most
      if (aa && !bb) return 1;
      if (!aa && bb) return -1;
      return 0;
    }

    switch (orderBy) {
      case 'contractAmount':
      case 'grossProfit':
      case 'refundAmt':
      case 'reductionAmt':
      case 'subsidyAmt':
      case 'profitRate':
        return sortNumber(a[orderBy] as number, b[orderBy] as number, !asc);
      case 'hasOtherAttachments':
        return sortNumber(a[orderBy] ? 1 : 0, b[orderBy] ? 1 : 0, !asc);

        // 完了 should be at the bottom
      case 'contractDate': {
        // compare by string
        const aa = a.contractDate as string;
        const bb = b.contractDate as string;
        return asc ? aa.localeCompare(bb) : bb.localeCompare(aa);
      }

      default : {
        // compare by string
        const aa = a[orderBy] as string;
        const bb = b[orderBy] as string;
        return asc ? aa.localeCompare(bb) : bb.localeCompare(aa);

      }
    }
  };


