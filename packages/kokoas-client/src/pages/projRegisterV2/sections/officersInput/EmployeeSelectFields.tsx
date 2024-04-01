import { KForm } from '../../schema';
import { Stack } from '@mui/material';
import { TAgents } from 'types';
import { ControlledEmpSelectField } from './ControlledEmpSelectField';
import { useTypedFormContext } from '../../hooks';

import { useFieldArray } from 'react-hook-form';


const empFieldLabels: Partial<Record<TAgents, string>> = {
  yumeAG: 'ゆめてつAG',
  cocoAG: '営業担当者',
  cocoConst: '工事担当者',
};

export const EmployeeSelectFields = ({
  name,
  agentType,
  required,
}:{
  name: KForm,
  agentType: TAgents,
  required?: boolean,
}) => {

  const { control } = useTypedFormContext();

  const fieldHelpers = useFieldArray({
    control,
    name: name as 'yumeAG' | 'cocoAG' | 'cocoConst',
  });


  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      {(fieldHelpers.fields )
        .map(({
          id,
        }, index) => {

          return (
            <ControlledEmpSelectField 
              key={id}
              label={`${empFieldLabels[agentType]}${index + 1}`}
              name={name}
              index={index}
              agentType={agentType}
              required={required}
            />
          );

        })}
    </Stack>
  );

  
};