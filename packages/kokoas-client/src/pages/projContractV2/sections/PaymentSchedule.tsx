import { Stack } from '@mui/system';
import { PaymentFieldGroup } from '../parts/PaymentFieldGroup';

export const PaymentSchedule = () => {
  return (
    <Stack spacing={2} my={2}>
      <PaymentFieldGroup
        fieldNames={{
          chkFldName: 'hasContractAmt',
          amtFldName: 'contractAmt',
          dateFldName: 'contractDate',
        }}
        label='契約金'
      />
    </Stack>
  );
};