import { Tooltip } from '@mui/material';
import {  useFormikContext } from 'formik';
import { numerals } from 'jp-numerals';
import {  getPayFieldNameByIdx, TypeOfForm } from '../../form';

import { FormikMoneyField } from 'kokoas-client/src/components';


export const PaymentFieldAmt = (
  {
    disabled,
    idx,
  } : {
    disabled: boolean
    idx: number,
  },
) => {
  const { values: { paymentFields } } = useFormikContext<TypeOfForm>();
  const jaValue = numerals(+paymentFields[idx]?.amount || 0).toString();

  return (
    <Tooltip title={jaValue}>
      <div>
        <FormikMoneyField
          variant='standard'
          name={getPayFieldNameByIdx('amount', idx)}
          disabled={disabled}
        />
      </div>
    </Tooltip>
  );
};