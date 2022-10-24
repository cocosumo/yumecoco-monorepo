import {  Grid } from '@mui/material';
import { FilterDialog } from './FilterDialog';
import { FilterItems } from './FilterItems';

export const FilterContainer = ({
  open,
  handleCloseFilterDialog,
}: {
  open: boolean,
  handleCloseFilterDialog: () => void,
}) => {

  return (
    <Grid container item xs={12} >
      <Grid item xs={12} md={10}>
        <FilterItems />
      </Grid>


      <FilterDialog open={open} onClose={handleCloseFilterDialog} />

    </Grid>

  );
};