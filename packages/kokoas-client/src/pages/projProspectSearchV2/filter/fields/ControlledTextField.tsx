import { Controller } from 'react-hook-form';
import { KForm } from '../../schema';
import { TextField } from '@mui/material';
import { useStartSearch } from '../../hooks/useStartSearch';

export const ControlledTextField = ({
  name,
  label,
  placeholder,
}:{
  name: KForm,
  label: string,
  placeholder?: string,

  
}) => {

  const handleStartSearch = useStartSearch();

  
  return (
    <Controller 
      name={name}
      render={({ field }) => {
        return (
          <TextField 
            {...field}
            label={label}
            size="small"
            placeholder={placeholder}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleStartSearch();
              }
            }}
          />);
      }}
    />);
};