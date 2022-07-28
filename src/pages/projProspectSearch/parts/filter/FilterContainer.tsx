import { Button, Grid } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react';
import { FilterDialog } from './FilterDialog';
import { FilterItems } from './FilterItems';

export const FilterContainer = () => {
  const [open, setOpen] = useState(false);
  const handleCloseFilterDialog = () => setOpen(false);
  const handleOpenFilterDialog = () => setOpen(true);

  return (
    <Grid container item xs={12} >
      <Grid item xs={12} md={9}>
        <FilterItems />
      </Grid>
      <Grid container item xs={12} md={3} justifyContent={'flex-end'}>
        <Button
        startIcon={<FilterListIcon/>}
        onClick={handleOpenFilterDialog}
        >
          絞り込む
        </Button>
      </Grid>


      <FilterDialog open={open} onClose={handleCloseFilterDialog} />

    </Grid>

  );
};