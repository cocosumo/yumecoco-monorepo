import { Box, Collapse } from '@mui/material';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { SyntheticEvent, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../form';


export const PendingContract = () => {

  const {
    control,
    setValue,
  } = useFormContext<TypeOfForm>();
  const contractIncomplete = useWatch({
    name: 'contractIncomplete',
    control,
  });

  const contractSteps = useWatch({
    name: [
      'contractStepAG',
      'contractStepCustomer',
      'contractStepTencho',
      'contractStepAccounting',
      'contractStepMain',
    ],
    control,
  });

  const isPartialSteps = contractSteps.some((step) => !step);

  const handleChange = useCallback((_: SyntheticEvent<HTMLInputElement>, checked: boolean) => {
    // 未完了チェックボックスがチェックされたら、全てのチェックボックスをチェックする
    if (isPartialSteps && !checked) {
      setValue('contractIncomplete', true);
      setValue('contractStepAG', true);
      setValue('contractStepCustomer', true);
      setValue('contractStepTencho', true);
      setValue('contractStepAccounting', true);
      setValue('contractStepMain', true);
    }
  }, [isPartialSteps, setValue]);

  return (
    <>
      <ControlledCheckBox
        label='未完了'
        control={control}
        name='contractIncomplete'
        indeterminate={isPartialSteps}
        onChange={handleChange}
      />

      <Collapse in={contractIncomplete}>

        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
          <ControlledCheckBox label='担当者確認中' control={control} name='contractStepAG' />

          <ControlledCheckBox label='顧客確認中' control={control} name='contractStepCustomer' />

          <ControlledCheckBox label='店舗確認中' control={control} name='contractStepTencho' />

          <ControlledCheckBox label='経理確認中' control={control} name='contractStepAccounting' />

          <ControlledCheckBox label='本社確認中' control={control} name='contractStepMain' />

        </Box>
      </Collapse>
    </>

  );
};