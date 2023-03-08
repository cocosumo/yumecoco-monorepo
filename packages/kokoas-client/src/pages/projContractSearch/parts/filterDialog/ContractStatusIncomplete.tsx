import { Box, Collapse } from '@mui/material';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { SyntheticEvent } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { KeyOfForm, TypeOfForm } from '../../form';
import { translateKey } from '../../helpers/translateKey';


export const ContractStatusIncomplete = () => {

  const {
    control,
    setValue,
    getValues,
  } = useFormContext<TypeOfForm>();
  const contractIncomplete = useWatch({
    name: 'contractIncomplete',
    control,
  });

  const stepsKeys: KeyOfForm[] = [
    'contractStepAG',
    'contractStepCustomer',
    'contractStepTencho',
    'contractStepAccounting',
    'contractStepMain',
  ];

  const contractSteps = useWatch({
    name: stepsKeys,
    control,
  });

  const isPartialSteps = contractSteps.some((step) => !step);

  const handleChangeIncompleteCheckbox = (_: SyntheticEvent<HTMLInputElement>, checked: boolean) => {

    // 未完了チェックボックスがチェックされたら、全てのチェックボックスをチェックする
    if ( checked || (isPartialSteps && !checked)) {
      setValue('contractIncomplete', true);
      setValue('contractStepAG', true);
      setValue('contractStepCustomer', true);
      setValue('contractStepTencho', true);
      setValue('contractStepAccounting', true);
      setValue('contractStepMain', true);
    }
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

      <Collapse in={contractIncomplete}>

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
      </Collapse>
    </>

  );
};