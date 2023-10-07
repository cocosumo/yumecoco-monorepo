import { Controller, useFormContext } from 'react-hook-form';
import { KForm, TForm } from '../../schema';
import { Button, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { EmpAffiliations, TAgents } from 'types';
import { useEffect } from 'react';
import { EmployeeSelector } from 'kokoas-client/src/components';
import { useTypedWatch } from '../../hooks';
import { v4 as uuidv4 } from 'uuid';

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
  agentType,
}:{
  name: KForm,
  agentType: TAgents,
}) => {
  const { control, setValue } = useFormContext<TForm>();
  const fields = useTypedWatch({
    control,
    name: name,
  }) as TForm['cocoAG'];

  console.log(name, fields);


  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      {fields
        .map(({
          empId,
        }, index) => {

          return (
            <EmployeeSelector 
              key={uuidv4()}
              label={`${empFieldLabels[agentType]}${index + 1}`}
              value={empId}
            />
          );

        })}
    </Stack>
  );

  
};