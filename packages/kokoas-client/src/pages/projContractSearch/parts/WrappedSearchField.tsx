import { LoadingButton } from '@mui/lab';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { FilterDialog } from './filterDialog/FilterDialog';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useState } from 'react';


export const WrappedSearchField = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => setFilterOpen(false);

  return (
    <Grid item xs={12} md={8}>
      <FilterDialog open={filterOpen} handleClose={handleFilterClose} />
      <Stack direction={'row'} spacing={1}>
        <TextField fullWidth />
        <LoadingButton
          variant='contained'
          //onClick={submitForm}
          //loading={isSubmitting}
        >
          <SearchIcon fontSize='large' />
        </LoadingButton>
        <Button
          variant={'contained'}
          onClick={handleFilterOpen}
        >
          <FilterListIcon />
        </Button>
      </Stack>
    </Grid>
  );
};