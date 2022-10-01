import { Checkbox, FormControlLabel } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import produce from 'immer';
import { ComponentProps } from 'react';
import { getPayFieldName, TypeOfForm } from '../../form';

/**
 * Need to improve type checking here.
 *  
 * @returns 
 */

export const PaymentFieldChk = ({
  label, 
  idx,
  remainingAmt,
}: {
  label: string,
  idx: number
  remainingAmt: number
}) => {
  const { setValues } = useFormikContext<TypeOfForm>();
  const [field ] = useField(getPayFieldName('checked', idx));
  const { value } = field;

  const handleChange: ComponentProps<typeof Checkbox>['onChange'] = (_, checked) => {


    setValues((prev) =>  produce(prev, ({ paymentFields: pF }) => {
      pF[idx].amount = checked ? remainingAmt : 0;
      pF[idx].checked = checked;
    }));
    
  };


  return (
    <FormControlLabel
      label={label}
      control={(
        <Checkbox
          onChange={handleChange}
          checked={value}
          sx={{
            transform: 'scale(1.5)',
          }}
        />)}
    />
  );
};