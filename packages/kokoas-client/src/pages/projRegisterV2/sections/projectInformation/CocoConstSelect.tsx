import { EmployeeSelector } from 'kokoas-client/src/components';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { KForm } from '../../schema';
import { Controller } from 'react-hook-form';

export const CocoConstSelect = ({
  label,
  name,
}:{
  label: string,
  name: KForm,
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
            label={label}
            value={value as string}
            onChange={onChange}
            onBlur={onBlur}
            filter={{
              affiliation: ['ここすも'],
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