import { EmployeeSelector } from 'kokoas-client/src/components';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { KForm } from '../../schema';
import { Controller } from 'react-hook-form';
import { fieldMapJa } from '../../api/fieldMapJa';

export const YumeAGSelect = ({
  name,
  required,
}:{
  name: KForm,
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
      }) => {
        return (
          <EmployeeSelector
            label={fieldMapJa[name]}
            value={value as string}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            filter={{
              affiliation: ['ゆめてつ'],
              roles:[ 
                '店長', 
                '店長代理', 
                '取締役',
                '主任', 
                '営業',
              ],
            }}
          />
        );
      }}
    />
    
  );
};