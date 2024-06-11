import { Box, Stack } from '@mui/material';
import { InvoiceItem } from './InvoiceItem';
import { grey } from '@mui/material/colors';
import { BillingAmount } from './BillingAmount';



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
        />
        <BillingAmount
          index={index}
        />
        {/* TODO 行追加ボタンの配置 */}
        {/* TODO 複数行表示されている場合のみ、行削除ボタンの配置 */}
      </Stack>
    </Box>
  );
};
