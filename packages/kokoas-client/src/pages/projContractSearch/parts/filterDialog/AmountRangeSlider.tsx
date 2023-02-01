import { Slider } from '@mui/material';
import isArray from 'lodash/isArray';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../form';

export const AmountRangeSlider = ({
  min = -20000,
  max = 50000000,
}: {
  min?: number,
  max?: number,
}) => {

  const {
    control,
    setValue,
    clearErrors,
  } = useFormContext<TypeOfForm>();

  const [amountFrom, amountTo] = useWatch({
    name: [
      'amountFrom',
      'amountTo',
    ],
    control,
  });

  return (
    <Slider
      /* Set value of the slider to it's min or max number if the field is empty
        otherwise, use their respective field values.
      */
      value={[
        amountFrom === undefined || (typeof amountFrom === 'string' && amountFrom === '') ? min : +amountFrom,
        amountTo === undefined || (typeof amountTo === 'string' && amountTo === '')  ? max : +amountTo,
      ]}
      onChange={(_: Event, newVal) => {
        if (isArray(newVal)) {
          const [newAmountFrom, newAmountTo] = newVal;

          setValue('amountFrom', newAmountFrom);
          setValue('amountTo', newAmountTo);

          // 決してエラーにならないと想定して、エラーを強制的に解消（多分）。
          // setValueのshouldValidateも使えますが、実際にバリデーションを行うと、スライダーのラグが発生する。
          // 想定が間違っていたら、改修。
          clearErrors('amountFrom');
          clearErrors('amountTo');
        }

      }}
      valueLabelFormat={(val) => `${val.toLocaleString()} 円`}
      valueLabelDisplay="auto"
      min={min}
      max={max}
    />
  );
};