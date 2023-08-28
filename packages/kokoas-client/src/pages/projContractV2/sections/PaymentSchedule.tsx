import { Stack, FormHelperText } from '@mui/material';
import { PaymentFieldGroup } from '../parts/PaymentFieldGroup';
import { RefundAmount } from '../parts/RefundAmount';
import { SubsidyAmount } from '../parts/SubsidyAmount';
import { blue } from '@mui/material/colors';
import { PaymentMethod } from '../parts/PaymentMethod';
import { ReductionAmount } from '../parts/ReductionAmount';

export const PaymentSchedule = ({
  disabled,
}: {
  disabled: boolean
}) => {
  return (
    <Stack 
      spacing={2} 
      my={2}
      position={'relative'}
      maxWidth={600}
    >
      <PaymentFieldGroup
        disabled={disabled}
        fieldNames={{
          chkFldName: 'hasContractAmt',
          amtFldName: 'contractAmt',
          dateFldName: 'contractAmtDate',
        }}
        label='契約金'
      />
      <PaymentFieldGroup
        disabled={disabled}
        fieldNames={{
          chkFldName: 'hasInitialAmt',
          amtFldName: 'initialAmt',
          dateFldName: 'initialAmtDate',
        }}
        label='着手金'
      />
      <PaymentFieldGroup
        disabled={disabled}
        fieldNames={{
          chkFldName: 'hasInterimAmt',
          amtFldName: 'interimAmt',
          dateFldName: 'interimAmtDate',
        }}
        label='中間金'
      />
      <PaymentFieldGroup
        disabled={disabled}
        fieldNames={{
          chkFldName: 'hasFinalAmt',
          amtFldName: 'finalAmt',
          dateFldName: 'finalAmtDate',
        }}
        label='最終金'
      />

      <PaymentFieldGroup
        disabled={disabled}
        fieldNames={{
          chkFldName: 'hasOthersAmt',
          amtFldName: 'othersAmt',
          dateFldName: 'othersAmtDate',
        }}
        label='その他'
      />

      <Stack 
        bgcolor={blue[50]}
        p={2}
        position={'relative'}
        left={-16}
        width={'calc(100% + 32px)'}
        borderRadius={1}
        spacing={2}
      >
        <FormHelperText>
          ※契約書には反映されません。
        </FormHelperText>
        <RefundAmount />
        <ReductionAmount />
        <SubsidyAmount />
 
      </Stack>
      
      <PaymentMethod disabled={disabled} />

    </Stack>
  );
};