import { Grid } from '@mui/material';
import { useState } from 'react';
import { FormikSearchField } from '../../../components/ui/textfield/FormikSearchField';
import { KeyOfForm } from '../form';
import { FilterDialog } from './filterDialog/FilterDialog';

export const WrappedSearchField = ({ name }: { name: KeyOfForm }) => {
  const [open, setOpen] = useState(false);

  const handleFilterOpen = () => setOpen(true);
  const handleFilterClose = () => setOpen(false);

  return (
    <Grid item xs={12} md={8}>
      <FilterDialog open={open} handleClose={handleFilterClose} />
      <FormikSearchField name={name} onOpenFilter={handleFilterOpen} />
    </Grid>
  );
};