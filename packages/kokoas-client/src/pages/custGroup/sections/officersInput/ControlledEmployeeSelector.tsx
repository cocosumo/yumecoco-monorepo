import { EmployeeSelector } from 'kokoas-client/src/components';
import { KForm } from '../../schema';
import { Controller } from 'react-hook-form';
import { EmpAffiliations } from 'types';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { fieldMapJa } from '../../api/fieldMapJa';

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
          ...fieldRest
        } = field;
        const showError = (isTouched || !!submitCount) && !!error;

        return (
          <EmployeeSelector
            {...fieldRest}
            label={fieldMapJa[name] || ''}
            value={value as string}
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