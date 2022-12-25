import { MenuItem } from '@mui/material';
import { Select } from 'kokoas-client/src/components/reactHookForm';
import { Control } from 'react-hook-form';
import { taxChoices } from 'types';
import { TypeOfForm } from '../../../form';
import { getItemsFieldName } from '../EstTRow';


export const TaxType = ({
  control,
  disabled,
  rowIdx,
}: {
  control: Control<TypeOfForm>
  disabled: boolean
  rowIdx: number
}) => {

  return (
    <Select
      controllerProps={{
        name: getItemsFieldName(rowIdx, 'taxable'),
        control,
      }}
      selectProps={{
        size: 'small',
        disabled,
        
      }}
    >
      {taxChoices.map((choice) => (
        <MenuItem 
          key={choice} 
          value={(choice === '課税') as any}
        >
          {choice}
        </MenuItem>
      ))}
    </Select>
  );
};