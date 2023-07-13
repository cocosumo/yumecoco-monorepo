import { FormGroup } from '@mui/material';
import { OutlinedDiv } from 'kokoas-client/src/components';
import { ControlledCheckBox } from 'kokoas-client/src/components/reactHookForm';
import { ContractStatusIncomplete } from './ContractStatusIncomplete';
import { useTypedFormContext } from '../../hooks/useTypedHooks';




export const ContractStatus = () => {
  const { control } = useTypedFormContext();


  return (
    <OutlinedDiv label='契約進捗'>
      <FormGroup>
        <ControlledCheckBox label='完了' control={control} name='contractCompleted' />
        <ContractStatusIncomplete />
      </FormGroup>
    </OutlinedDiv>
  );
};