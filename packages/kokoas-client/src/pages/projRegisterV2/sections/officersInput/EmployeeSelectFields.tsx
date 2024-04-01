import { KForm, TForm } from '../../schema';
import { Stack } from '@mui/material';
import { TAgents } from 'types';
import { ControlledEmpSelectField } from './ControlledEmpSelectField';
import { useTypedFormContext } from '../../hooks';
import { useFieldArray } from 'react-hook-form';
import { getDefaultEmployee } from '../../form';
import { useEffect } from 'react';
import { splitFieldInternalAndForwardedProps } from '@mui/x-date-pickers/internals';


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

  const arrayHelpers = useFieldArray({
    control,
    name: name as 'yumeAG',
  });

  const {
    fields,
  } = arrayHelpers;


  useEffect(() => {
    console.log('fields', fields);
  }, [fields]);


  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      {(fields as TForm['yumeAG'])
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
              fields={fields}
              required={required}
              //appendNew={() => append(getDefaultEmployee(agentType))}
            />
          );

        })}
    </Stack>
  );

  
};