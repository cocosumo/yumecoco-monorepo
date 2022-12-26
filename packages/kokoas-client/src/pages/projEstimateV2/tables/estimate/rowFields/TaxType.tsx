import { MenuItem } from '@mui/material';
import { Select } from 'kokoas-client/src/components/reactHookForm';
import { Control } from 'react-hook-form';
import { taxChoices } from 'types';
import { getItemsFieldName, TypeOfForm } from '../../../form';


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