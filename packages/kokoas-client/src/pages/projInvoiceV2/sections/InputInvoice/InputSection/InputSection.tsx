import { Box, Stack } from '@mui/material';
import { InvoiceItem } from './InvoiceItem';
import { grey } from '@mui/material/colors';
import { BillingAmount } from './BillingAmount';


export type BillingItems = {
  contractType: string;
  label: string;
  amount: number;
};

const billingItems: BillingItems[] = [{
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



export const InputSection = () => {

  const index = 0; // TODO仮

  return (
    <Box
      bgcolor='white'
      p={2}
      border={1}
      borderColor={grey[300]}
    >
      <Stack direction={'column'}>
        <InvoiceItem
          index={index}
          billingItems={billingItems}
        />
        <BillingAmount
          index={index}
          billingItems={billingItems}
        />
        {/* TODO 行追加ボタンの配置 */}
        {/* TODO 複数行表示されている場合のみ、行削除ボタンの配置 */}
      </Stack>
    </Box>
  );
};
