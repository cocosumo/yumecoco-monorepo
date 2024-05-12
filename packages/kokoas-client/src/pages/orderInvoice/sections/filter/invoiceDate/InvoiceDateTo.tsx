import { Controller } from 'react-hook-form';
import { useTypedFormContext } from '../../../hooks/useTypedRHF';
import { CustomDate } from './CustomDate';

export const InvoiceDateTo = () => {
  const { control } = useTypedFormContext();


  return (
    <Controller
      name="invoiceDateTo"
      control={control}
      render={({ 
        field,
        fieldState: { error },
      }) => {
        return (
          <CustomDate
            value={field.value}
            onChange={field.onChange}
            error={error}
            label='請求日（終了）'
          />
        );
      }}

    />
  );
};