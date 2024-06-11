import { Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
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
    <Stack
      p={2}
      border={1}
      borderColor={grey[300]}
      bgcolor='white'
      spacing={2}
    >
      請求情報の入力エリア
      {/* <InvoiceItem
        index={0} // 仮
        name="invoiceItem"
        billingItems={billingItems}
      />
      <BillingAmount /> */}
    </Stack>
  );
};
