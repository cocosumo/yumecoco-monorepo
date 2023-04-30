import { Stack } from '@mui/system';
import { PaymentFieldGroup } from '../parts/PaymentFieldGroup';
import { RefundAmount } from '../parts/RefundAmount';
import { SubsidyAmount } from '../parts/SubsidyAmount';
import { blue } from '@mui/material/colors';
import { FormHelperText } from '@mui/material';

export const PaymentSchedule = () => {
  return (
    <Stack 
      spacing={2} 
      my={2}
      position={'relative'}
      maxWidth={600}
    >
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

      <Stack 
        bgcolor={blue[50]}
        p={2}
        maxWidth={600}
        position={'relative'}
        left={-16}
        borderRadius={1}
        spacing={2}
      >
        <FormHelperText>
          ※契約書には反映されません。
        </FormHelperText>
        <RefundAmount />
        <SubsidyAmount />
 
      </Stack>

    </Stack>
  );
};