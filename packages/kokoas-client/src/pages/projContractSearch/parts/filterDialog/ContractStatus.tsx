import { Box, Collapse, FormGroup } from '@mui/material';
import { OutlinedDiv } from 'kokoas-client/src/components';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { Control, useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../../form';



const PendingContract = ({ control }: {
  control: Control<TypeOfForm>,
}) => {
  const contractIncomplete = useWatch({
    name: 'contractIncomplete',
    control,
  });


  return (
    <Collapse in={!!contractIncomplete}>

      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
        <ControlledCheckBox label='担当者確認中' control={control} name='contractStepAG' />

        <ControlledCheckBox label='顧客確認中' control={control} name='contractStepCustomer' />

        <ControlledCheckBox label='店舗確認中' control={control} name='contractStepTencho' />

        <ControlledCheckBox label='経理確認中' control={control} name='contractStepAccounting' />

        <ControlledCheckBox label='本社確認中' control={control} name='contractStepMain' />

      </Box>
    </Collapse>
  );
};

export const ContractStatus = () => {
  const { control, watch } = useFormContext<TypeOfForm>();


  console.log(watch());
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

  //const isPartialSteps = !contractSteps.some((step) => step === false);

  return (
    <OutlinedDiv label='契約進歩'>
      <FormGroup>
        <ControlledCheckBox label='完了' control={control} name='contractCompleted' />
        <ControlledCheckBox label='未完了' control={control} name='contractIncomplete' />
        <PendingContract control={control} />
      </FormGroup>
    </OutlinedDiv>
  );
};