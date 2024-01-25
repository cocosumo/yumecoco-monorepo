import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller } from 'react-hook-form';
import { KForm } from '../../schema';
import { useTypedFormContext } from '../../hooks';



const radioLabels = ['ANDPAD', '大黒さん'];


export const LedgerRadioButton = ({
  name,
  defaultValue = 'ANDPAD',
}: {
  name: KForm,
  defaultValue?: string,
}) => {
  const {
    control,
  } = useTypedFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: {
          value,
          ...otherValue
        },
      }) => {

        return (
          <RadioGroup          
            {...otherValue}
            defaultValue={defaultValue}
            value={value || ''}
          >
            {radioLabels.map((radioLabel) => {
              return (<FormControlLabel
                key={radioLabel}
                value={radioLabel}
                control={<Radio />}
                label={radioLabel}
                      />);
            })}
          </RadioGroup>
        );
      }}
    />

  );
};
