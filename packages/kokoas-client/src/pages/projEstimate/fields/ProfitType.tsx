import { NumberField } from 'kokoas-client/src/components/reactHookForm';
import { Control } from 'react-hook-form';
import { TForm } from '../schema';

export function ProfitType({
  control,
}:   {
  control: Control<TForm>
}) {

  

  return (
    <NumberField 
      controllerProps={{
        name: 'projTypeProfit',
        control,
      }}
      textFieldProps={{
        type: 'number',
      }} 
    />
  );
}