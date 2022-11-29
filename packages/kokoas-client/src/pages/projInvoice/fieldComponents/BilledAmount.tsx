import { BilledAmountDetails } from './BilledAmountDetails';
import { DisplayAmount } from './DisplayAmount';

/**
 * 請求済み金額コンポーネント
 * @param projId :工事番号
 * @returns 
 */
export const BilledAmount = ({
  billedAmount,
  records,
}: {
  billedAmount: number | undefined
  records: DBInvoices.SavedData[] | undefined
}) => {


  return (
    <>
      <DisplayAmount
        amount={billedAmount}
        label={'請求済金額'}
      />
      <BilledAmountDetails invoices={records} />
    </>
  );
};