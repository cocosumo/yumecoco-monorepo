import { Fragment } from 'react';
//import { BillingAmount } from './BillingAmount';
//import { InvoiceItem } from './InvoiceItem';



const billingItems = [{
  contractType: '契約',
  label: '着工金',
  amount: 600000,
},
{
  contractType: '契約',
  label: '最終金',
  amount: 400000,
},
{
  contractType: '追加',
  label: 'その他',
  amount: -500000,
}];

export type BillingItems = typeof billingItems[0];


export const InputSection = () => {


  return (
    <Fragment>
      {/* <InvoiceItem
        index={0} // 仮
        name="invoiceItem"
        billingItems={billingItems}
      />
      <BillingAmount /> */}
    </Fragment>
  );
};
