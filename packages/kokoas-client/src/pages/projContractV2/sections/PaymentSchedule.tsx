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
      <PaymentFieldGroup
        fieldNames={{
          chkFldName: 'hasStartAmt',
          amtFldName: 'startAmt',
          dateFldName: 'startAmtDate',
        }}
        label='着手金'
      />
      <PaymentFieldGroup
        fieldNames={{
          chkFldName: 'hasInterimAmt',
          amtFldName: 'interimAmt',
          dateFldName: 'interimAmtDate',
        }}
        label='中間金'
      />
      <PaymentFieldGroup
        fieldNames={{
          chkFldName: 'hasFinalAmt',
          amtFldName: 'finalAmt',
          dateFldName: 'finalAmtDate',
        }}
        label='最終金'
      />
    </Stack>
  );
};