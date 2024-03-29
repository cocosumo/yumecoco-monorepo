import { Stack, TextField } from '@mui/material';
import { Keyword } from './Keyword';
import { SearchButton } from './SearchButton';
import { FilterButton } from './FilterButton';
import { DevTool } from '@hookform/devtools';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../../schema';
import { useStartSearch } from '../../hooks/useStartSearch';
import { DeletedProjectsToggle } from './filterForm/DeletedProjectsToggle';
import { ResetButton } from './ResetButton';


export const Filter = () => {
  const { control, register } = useFormContext<TypeOfForm>();
  const handleStartSearch = useStartSearch();

  return (
    <Stack 
      direction={'row'}
      justifyContent={'space-between'}
    >
      <Stack
        spacing={1}
        direction={'row'}
        sx={({ breakpoints }) => ({
          maxWidth: breakpoints.values.sm,
        })}
      >

     
        <Keyword />
        <TextField 
          size="small" 
          label="お客様名"
          placeholder='氏名・シメイ'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleStartSearch();
            }
          }}
          {...register('custName')}
        />
        <SearchButton />
        <FilterButton />
        <ResetButton />
      </Stack>
      <DeletedProjectsToggle submitOnchange />
      <DevTool control={control} />
    </Stack>
 
  );
};