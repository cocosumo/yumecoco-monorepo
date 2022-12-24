import { MenuItem } from '@mui/material';
import { Select } from 'kokoas-client/src/components/reactHookForm';
import { Control } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { statusChoices } from '../validationSchema';

export const StatusSelect = ({
  control,
}:{
  control: Control<TypeOfForm>
}) => {

  

  return (
    <Select
      controllerProps={{
        name: 'status',
        control,
      }}
      selectProps={{
        label: 'ステータス',
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