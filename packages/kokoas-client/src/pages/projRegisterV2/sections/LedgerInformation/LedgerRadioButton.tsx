import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Controller } from 'react-hook-form';
import { KForm } from '../../schema';
import { useTypedFormContext, useTypedWatch } from '../../hooks';



const radioLabels = ['ANDPAD', '大黒さん'];


export const LedgerRadioButton = ({
  name,
}: {
  name: KForm,
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
            row
            {...otherValue}
            value={value || 'ANDPAD'} // 初期値を'ANDPAD'とする
          >
            {radioLabels.map((radioLabel) => {
              return (<FormControlLabel
                key={radioLabel}
                value={radioLabel}
                control={<Radio />}
                label={radioLabel}
                sx={{ px: '20px' }}
                      />);
            })}
          </RadioGroup>
        );
      }}
    />

  );
};
