import { EmployeeSelector } from 'kokoas-client/src/components';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { Controller } from 'react-hook-form';
import { EmpAffiliations } from 'types';
import { KForm } from '../../schema';

export const ControlledEmployeeSelector = ({
  affiliation,
  required,
  label = '',
  name,
}:{
  affiliation: EmpAffiliations[]
  required?: boolean,
  label?: string,
  name: string,
}) => {
  const { control } = useTypedFormContext();

  return (
    <Controller 
      name={name as KForm}
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
          onChange: _,
          ...fieldRest
        } = field;
        const showError = (isTouched || !!submitCount) && !!error;



        return (
          <EmployeeSelector
            {...fieldRest}
            label={label}
            //value={currEmpId}
            value={''}
            error={showError}
            helperText={error?.message}
            onChange={(empId, empRec) => {
              console.log('empId', empId, empRec);
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