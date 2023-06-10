import { Stack } from '@mui/material';
import { Keyword } from './Keyword';
import { SearchButton } from './SearchButton';
import { FilterButton } from './FilterButton';
import { DevTool } from '@hookform/devtools';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from 'kokoas-client/src/components';


export const Filter = () => {
  const { control } = useFormContext<TypeOfForm>();

  return (
    <Stack 
      spacing={1}
      direction={'row'}
      sx={({ breakpoints }) => ({
        maxWidth: breakpoints.values.sm,
      })}
    >
      <Keyword />
      <SearchButton />
      <FilterButton />
      <DevTool control={control} />
    </Stack>
 
  );
};