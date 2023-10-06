import { useFieldArray } from 'react-hook-form';
import { useTypedFormContext } from '../../hooks';
import { KForm } from '../../schema';
import { Stack } from '@mui/material';
import { EmpAffiliations, TAgents } from 'types';
import { useEffect } from 'react';
import { EmployeeSelector } from 'kokoas-client/src/components';

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
  const { control, setValue } = useTypedFormContext();
  const { fields, append, update } = useFieldArray({
    control,
    name: name as 'cocoAG', // TODO: fix this
  });

  useEffect(() => {
    if (fields.length !== 2 ) {
      // append empty fields based on length
      append({
        empId: '',
        empName: '',
        empRole: '',
        empType: agentType,
      });
      
    }

  }, [fields, append, agentType, update]);


  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      {fields.map(({
        id,
        empId,
      }, index) => {

        return (
          <EmployeeSelector
            key={id}
            label={`${empFieldLabels[agentType]}${index + 1}`}
            value={empId || ''}
            //error={showError}
            //helperText={error?.message}
            onChange={(_empId, empRec) => {
              console.log('onChange', agentType, _empId);
              setValue(`${name as 'cocoAG'}.${index}.empId`, _empId);
              /* update(index, {
                empId: _empId,
                empName: empRec?.文字列＿氏名?.value || '',
                empRole: empRec?.役職?.value || '',
                empType: agentType,
              }); */

            }}
            //required={required}
            filter={{
              affiliation: [empAffiliations[agentType]],
              roles:[ 
                '店長', 
                '店長代理', 
                '取締役',
                '主任', 
                '工務', 
                '営業',
              ],
            }}
          />);

      })}
    </Stack>
  );

  
};