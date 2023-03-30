import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { SubsidyMethods, TypeOfForm, subsidyMethods } from '../../form';
import { useFormikContext } from 'formik';
import { produce } from 'immer';

const label: Record<SubsidyMethods, string> = {
  0: '工事に含む',
  1: '顧客に返金',
};

export const SubsidyMethod = (
  { 
    disabled, 
  }: {
    disabled: boolean
  }) => {
  const { 
    values: {
      subsidyMethod,
    }, 
    setValues,
  } = useFormikContext<TypeOfForm>();

  return (
    <FormControl disabled={disabled}>
      <RadioGroup 
        row
        value={subsidyMethod} 
        onChange={(e, value) => {
          setValues((prev) => produce(prev, (draft) => {
            draft.subsidyMethod = +value as SubsidyMethods;
          }));
        }}
      >
        {subsidyMethods
          .map((value) => (
            <FormControlLabel 
              key={value} 
              value={value} 
              control={<Radio />}
              label={label[value]}
              sx={{ mr: 0, ml: 1 }}
            /> 
          ))}
      </RadioGroup>
    </FormControl>);
};