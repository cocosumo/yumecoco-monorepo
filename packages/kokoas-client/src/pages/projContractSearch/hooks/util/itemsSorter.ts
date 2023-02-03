import { TypeOfForm } from '../../form';
import { ContractRow } from '../useFilteredContracts';

/** 数字をソートする */
const sortNumber = (a: number, b: number, desc: boolean) =>
  desc ? b - a : a - b;

/** 日付をソートする */
const sortDate = (a: string | undefined, b: string | undefined, desc: boolean) => {
  if (!a) return 1;
  if (!b) return -1;

  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();

  return sortNumber(dateA, dateB, desc);
};

export const itemsSorter = ({
  order,
  orderBy,
}:{
  order: TypeOfForm['order']
  orderBy: keyof ContractRow
}) =>
  (a: ContractRow, b: ContractRow) => {
    const desc = order === 'desc';

    switch (orderBy) {
      case 'contractAmount':
      case 'grossProfit':
      case 'latestInvoiceAmount':
        return sortNumber(a[orderBy] as number, b[orderBy] as number, desc);

      case 'contractDate':
      case 'latestInvoiceDate':
      case 'plannedPaymentDate':
        return sortDate(a[orderBy], b[orderBy], desc);

      default :
        return desc
          ?  (a[orderBy]).localeCompare((b[orderBy]))
          :  (b[orderBy]).localeCompare((a[orderBy]));
    }
  };


