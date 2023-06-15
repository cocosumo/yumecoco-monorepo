import { MenuItem } from '@mui/material';
import { Select } from 'kokoas-client/src/components/reactHookForm';
import { Control } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { statusChoices } from '../validationSchema';

export const StatusSelect = ({
  control,
  disabled,
}:{
  control: Control<TypeOfForm>,
  disabled: boolean
}) => {

  

  return (
    <Select
      controllerProps={{
        name: 'status',
        control,
      }}
      selectProps={{
        label: 'ステータス',
        disabled,

      }}
    >
      {statusChoices.map((choice) => (
        <MenuItem key={choice} value={choice}>
          {choice}
        </MenuItem>
      ))}
    </Select>
  );
};