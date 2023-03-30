import { Tooltip } from '@mui/material';
import { useField } from 'formik';
import { numerals } from 'jp-numerals';
import { getFieldName } from '../../form';
import { FormikMoneyField } from 'kokoas-client/src/components';


const fieldName = getFieldName('subsidyAmt');

export const SubsidyAmt = (
  {
    disabled,
  } : {
    disabled: boolean
  },
) => {
  
  const [field, meta] = useField(fieldName);
  const { value } = field;
  const { error, touched } = meta;

  const jaValue = numerals(+value || 0).toString();

  return (
    <Tooltip title={!error ? jaValue : ''}>
      <div>
        <FormikMoneyField 
          {...field} 
          variant='standard'
          disabled={disabled}
          error={touched && !!error}
        />
      </div>
    </Tooltip>
  );
};