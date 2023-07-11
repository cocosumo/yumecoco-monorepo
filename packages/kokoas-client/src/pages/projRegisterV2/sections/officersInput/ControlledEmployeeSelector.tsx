import { EmployeeSelector } from 'kokoas-client/src/components';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { KForm } from '../../schema';
import { Controller } from 'react-hook-form';
import { fieldMapJa } from '../../api/fieldMapJa';
import { EmpAffiliations } from 'types';

export const ControlledEmployeeSelector = ({
  name,
  affiliation,
  required,
}:{
  name: KForm,
  affiliation: EmpAffiliations[]
  required?: boolean,
}) => {
  const { control } = useTypedFormContext();

  return (
    <Controller 
      name={name}
      control={control}
      render={({
        field: {
          value,
          onChange,
          onBlur,
        },
        fieldState: {
          isTouched,
          error,
        },
      }) => {
        const showError = isTouched && !!error;

        return (
          <EmployeeSelector
            label={fieldMapJa[name]}
            value={value as string}
            onChange={onChange}
            onBlur={onBlur}
            error={showError}
            helperText={error?.message}
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