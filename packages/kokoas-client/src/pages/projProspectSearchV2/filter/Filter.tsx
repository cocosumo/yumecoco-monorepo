import { Stack, TextField } from '@mui/material';
//import { SearchButton } from './SearchButton';
//import { FilterButton } from './FilterButton';
//import { useStartSearch } from '../../hooks/useStartSearch';
import { useTypedFormContext } from '../hooks/useTypedHooks';
import { DevTool } from '@hookform/devtools';
import { Keyword } from './Keyword';
import { SearchButton } from './SearchButton';
import { FilterButton } from './FilterButton';


export const Filter = () => {
  const { control, register } = useTypedFormContext();
  ///const handleStartSearch = useStartSearch();

  return (
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
            // handleStartSearch();
          }
        }}
        {...register('custNames')}
      />
      <SearchButton />
      <FilterButton />

      {/* <FilterButton /> */}
      <DevTool control={control} />

    </Stack>
 
  );
};