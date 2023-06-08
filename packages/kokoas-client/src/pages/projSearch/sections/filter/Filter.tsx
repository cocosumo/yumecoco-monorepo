import { Stack } from '@mui/material';
import { Keyword } from './Keyword';
import { SearchButton } from './SearchButton';
import { FilterButton } from './FilterButton';


export const Filter = () => {
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
    </Stack>
 
  );
};