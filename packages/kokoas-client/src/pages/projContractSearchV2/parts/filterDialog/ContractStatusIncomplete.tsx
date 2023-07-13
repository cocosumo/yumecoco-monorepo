import { Box } from '@mui/material';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { SyntheticEvent } from 'react';
import { useWatch } from 'react-hook-form';
import { translateKey } from '../../helpers/translateKey';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { KForm } from '../../schema';


export const stepsKeys: KForm[] = [
  'contractStepAG',
  'contractStepCustomer',
  'contractStepTencho',
  'contractStepAccounting',
  'contractStepMain',
];

export const ContractStatusIncomplete = () => {

  const {
    control,
    setValue,
    getValues,
  } = useTypedFormContext();


  const contractSteps = useWatch({
    name: stepsKeys,
    control,
  });



  const isPartialSteps = contractSteps.some((step) => !step) && !contractSteps.every((step) => !step);


  const handleChangeIncompleteCheckbox = (_: SyntheticEvent<HTMLInputElement>, checked: boolean) => {

    const indeterminateChecked = isPartialSteps && !checked
      ? true // 未完了チェックボックスをオフにしたとき、一部チェックがついている場合は、未完了チェックボックスをオンにする
      : checked; // その他の場合は、未完了チェックボックスの状態をそのまま

    stepsKeys
      .forEach((key) => {
        setValue(key, indeterminateChecked);
      });

    setValue('contractIncomplete', indeterminateChecked);
  };

  const handleChangeStepCheckbox = () => {
    const isNoStepsSelected = getValues(stepsKeys).every((step) => !step);

    if (isNoStepsSelected) {
      setValue('contractIncomplete', false);
    }
  };

  return (
    <>
      <ControlledCheckBox
        label='未完了'
        control={control}
        name='contractIncomplete'
        indeterminate={isPartialSteps}
        onChange={handleChangeIncompleteCheckbox}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        {stepsKeys.map((key) => (
          <ControlledCheckBox
            key={key}
            label={translateKey(key)}
            control={control}
            name={key}
            onChange={handleChangeStepCheckbox}
          />))}
      </Box>
 
    </>

  );
};