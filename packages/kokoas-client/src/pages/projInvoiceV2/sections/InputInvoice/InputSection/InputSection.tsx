import { Alert, Box, Stack, Typography } from '@mui/material';
import { InvoiceItem } from './InvoiceItem';
import { grey } from '@mui/material/colors';
import { BillingAmount } from './BillingAmount';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { useFieldArray } from 'react-hook-form';
import { AddButton } from './AddButton';
import { initInvDetailsValue } from '../../../form';
import { DeleteButton } from './DeleteButton';



export const InputSection = () => {
  const { control } = useTypedFormContext();

  const {
    fields: invoiceDetails,
    insert,
    remove,
  } = useFieldArray({
    control,
    name: 'invoiceDetails',
  });

  const invDetailsLen = invoiceDetails.length;
  const isMaxInv = invDetailsLen >= 7;
  const isMinInv = invDetailsLen <= 1;


  return (
    <Box
      bgcolor='white'
      p={2}
      border={1}
      borderColor={grey[300]}
    >
      <Typography variant='caption'>
        ※請求済み項目は選択できません
      </Typography>

      <Stack
        spacing={1}
        direction={'column'}
      >
        {invoiceDetails.map((invoiceDetail, index) => {
          return (
            <Stack
              spacing={2}
              direction={'row'}
              alignItems={'center'}
              key={invoiceDetail.id}
            >
              <InvoiceItem
                index={index}
              />
              <BillingAmount
                index={index}
              />

              <AddButton
                disabled={isMaxInv}
                handleClick={() => {
                  insert(index + 1, {
                    ...initInvDetailsValue,
                    invoiceItem: '',
                  });
                }}
              />

              <DeleteButton
                disabled={isMinInv}
                handleClick={() => remove(index)}
              />
            </Stack>
          );
        })}
      </Stack>

      {isMaxInv && (
        <Alert>
          一度に請求できる項目は最大7件までです。
        </Alert>
      )}


    </Box>
  );
};
