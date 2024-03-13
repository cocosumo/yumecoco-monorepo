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
        const aa = a.contractStatus as string;
        const bb = b.contractStatus as string;

        console.log(aa, bb, orderBy);
        const aIsCompleted = aa === 'completed';
        const bIsCompleted = bb === 'completed';
        
        // 完了 should be at the bottom, and empty should be at the top most
        if (aIsCompleted && !bIsCompleted) return 1;
        if (!aIsCompleted && bIsCompleted) return -1;
        return 0;





      }
    }
  };


