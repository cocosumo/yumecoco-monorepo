import { EmployeeSelector } from 'kokoas-client/src/components';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';
import { EmpAffiliations, TAgents } from 'types';

export const ControlledEmployeeSelector = ({
  affiliation,
  required,
  label = '',
  name,
  agentType,
}:{
  affiliation: EmpAffiliations[]
  required?: boolean,
  label?: string,
  name: string,
  agentType: TAgents
}) => {
  const { control } = useTypedFormContext();

  return (
    <Controller 
      name={name as `cocoAG.${number}`}
      control={control}
      render={({
        field,
        fieldState: {
          isTouched,
          error,
        },
        formState: {
          submitCount,
        },
      }) => {
        const {
          value,
          onChange,
          ...fieldRest
        } = field;
        const showError = (isTouched || !!submitCount) && !!error;
        
        return (
          <EmployeeSelector
            {...fieldRest}
            label={label}
            value={value?.empId || ''}
            error={showError}
            helperText={error?.message}
            onChange={(empId, empRec) => {
              onChange({
                empId: empId,
                empName: empRec?.文字列＿氏名?.value || '',
                empRole: empRec?.役職?.value || '',
                empType: agentType,
              });
            }}
            required={required}
            filter={{
              affiliation: affiliation,
              roles:[ 
                '店長', 
                '店長代理', 
                '取締役',
                '主任', 
                '工務', 
                '営業',
              ],
            }}
          />
        );
      }}
    />
    
  );
};