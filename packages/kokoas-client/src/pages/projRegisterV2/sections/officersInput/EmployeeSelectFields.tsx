import { useFormContext } from 'react-hook-form';
import { KForm, TForm } from '../../schema';
import { Stack } from '@mui/material';
import { TAgents } from 'types';
import { EmployeeSelector } from 'kokoas-client/src/components';
import { useTypedWatch } from '../../hooks';


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

  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      {fields
        .map(({
          key,
          empId,
        }, index) => {

          return (
            <EmployeeSelector 
              key={key}
              label={`${empFieldLabels[agentType]}${index + 1}`}
              value={empId}
              onChange={(selectedEmpId, rec) => {
                
                const {
                  役職: empRole,
                  文字列＿氏名: empName,
                } = rec || {};
                const fieldPath = `${name}.${index}` as `${TAgents}.${number}`;
                
                setValue(`${fieldPath}.empId`, selectedEmpId || '');
                setValue(`${fieldPath}.empRole`, empRole?.value || '');
                setValue(`${fieldPath}.empName`, empName?.value || '');

              }}
            />
          );

        })}
    </Stack>
  );

  
};