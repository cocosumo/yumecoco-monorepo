import { NumberField } from 'kokoas-client/src/components/reactHookForm';
import { Control } from 'react-hook-form';
import { TypeOfForm } from '../form';

export function ProfitType({
  control,
}:   {
  control: Control<TypeOfForm>
},
) {

  

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