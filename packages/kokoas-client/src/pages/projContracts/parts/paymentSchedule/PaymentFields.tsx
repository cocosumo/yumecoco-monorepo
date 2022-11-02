import { Stack } from '@mui/material';
import { FieldArray } from 'formik';
import { KeyOfForm, paymentLabels } from '../../form';
import { PaymentFieldGroup } from './PaymentFieldGroup';


export const PaymentFields = ({
  disabled = false,
}: {
  disabled?: boolean
}) => {

  const payFieldName: KeyOfForm = 'paymentFields';

  return (
    <Stack spacing={2}>
      <FieldArray
        name={payFieldName}
        render={() => {

          return paymentLabels
            .map((label, idx) => (
              <PaymentFieldGroup
                key={label}
                label={label}
                idx={idx}
                disabled={disabled}
              />
            ));
        }}
      />
    </Stack>
  );
};