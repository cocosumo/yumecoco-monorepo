import { FormGroup } from '@mui/material';
import { OutlinedDiv } from 'kokoas-client/src/components';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { PendingContract } from './PendingContract';




export const ContractStatus = () => {
  const { control } = useFormContext<TypeOfForm>();


  return (
    <OutlinedDiv label='契約進歩'>
      <FormGroup>
        <ControlledCheckBox label='完了' control={control} name='contractCompleted' />
        <PendingContract />
      </FormGroup>
    </OutlinedDiv>
  );
};