import { Fragment } from 'react';
import { BillingItems } from './InputSection';



export const BillingAmount = ({
  index,
  required,
  billingItems,
}: {
  index: number,
  required?: boolean
  billingItems: BillingItems[]
}) => {

  return (
    <Fragment>
      {/* InvoiceItemで選択した項目の金額をデフォルト表示し、編集も可能とする */}
    </Fragment>
  );
};
