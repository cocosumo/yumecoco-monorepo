import { useFieldArray } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks';
import { KForm } from '../../schema';
import { ControlledEmployeeSelector } from './ControlledEmployeeSelector';
import { Stack } from '@mui/material';
import { EmpAffiliations, TAgents } from 'types';

/* const empInputs: TAgents[] = [
  'yumeAG',
  'cocoAG',
  'cocoConst',
]; */

const empAffiliations: Record<TAgents, EmpAffiliations> = {
  yumeAG: 'ゆめてつ',
  cocoAG: 'ここすも',
  cocoConst: 'ここすも',
};

const empFieldLabels: Partial<Record<TAgents, string>> = {
  yumeAG: 'ゆめてつAG',
  cocoAG: '営業担当者',
  cocoConst: '工事担当者',
};

export const EmployeeSelectFields = ({
  name,
}:{
  name: KForm
}) => {
  const { control } = useTypedFormContext();
  const { fields } = useFieldArray({
    control,
    name: name as 'cocoAG', // TODO: fix this
  });

  console.log(name, fields);

  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      {fields.map(({
        id,
        empType,
      }, index) => {

        return (
          <ControlledEmployeeSelector 
            affiliation={[empAffiliations[empType as TAgents]]}
            key={id}
            name={`${name}.${index}`}
            label={`${empFieldLabels[empType as TAgents]}`}
            agentType={empType as TAgents}
          />);

      })}
    </Stack>
  );

  
};