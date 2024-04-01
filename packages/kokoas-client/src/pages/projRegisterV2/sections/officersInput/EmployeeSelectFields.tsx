import { KForm, TForm } from '../../schema';
import { Stack } from '@mui/material';
import { TAgents } from 'types';
import { ControlledEmpSelectField } from './ControlledEmpSelectField';
import { useTypedFormContext, useTypedWatch } from '../../hooks';
import { useEffect } from 'react';
import { getDefaultEmployee } from '../../form';


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

  const { setValue } = useTypedFormContext();

  const fieldsValues = useTypedWatch({
    name: name as 'yumeAG',
  }) as TForm['yumeAG'];

  useEffect(() => {
    if (fieldsValues.length === 1 && fieldsValues[0].empId !== '') {
      setValue(name, [...fieldsValues, getDefaultEmployee(agentType)], { shouldValidate: true });
    } else if (fieldsValues.length === 2 && fieldsValues.every(({ empId }) => !empId )) {
      setValue(name, [getDefaultEmployee(agentType)]);
    }

  }, [fieldsValues, setValue, name, agentType]);

  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      {(fieldsValues as TForm['yumeAG'])
        .map(({
          key,
        }, index) => {

          return (
            <ControlledEmpSelectField 
              key={key}
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