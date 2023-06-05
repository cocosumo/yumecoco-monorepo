import { Tooltip } from '@mui/material';
import {  useFormikContext } from 'formik';
import { numerals } from 'jp-numerals';
import {  getPayFieldNameByIdx, TypeOfForm } from '../../form';

import { FormikMoneyField } from 'kokoas-client/src/components';
import { useEffect } from 'react';
import { produce } from 'immer';


export const PaymentFieldAmt = (
  {
    disabled,
    idx,
  } : {
    disabled: boolean
    idx: number,
  },
) => {
  const {
    values: {
      paymentFields,
    },
    setValues,
  } = useFormikContext<TypeOfForm>();
  const newValue = +paymentFields[idx]?.amount || 0;

  const jaValue = numerals(newValue).toString();


  useEffect(() =>{
    setValues((prev) => produce(prev, draft => {
      const { totalAmount, paymentFields: pF } = draft;
      draft.remainingAmt = pF.reduce((acc, { amount }) => acc - +amount, totalAmount);
    }));
  }, [newValue, setValues]);


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