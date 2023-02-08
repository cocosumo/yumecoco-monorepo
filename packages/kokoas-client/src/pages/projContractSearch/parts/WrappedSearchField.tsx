import { Button, OutlinedInput, Stack } from '@mui/material';
import { FilterDialog } from './filterDialog/FilterDialog';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useState } from 'react';
import {  useFormContext } from 'react-hook-form';
import {  TypeOfForm } from '../form';

import { SubmitButton } from './filterDialog/SubmitButton';
import { useNavigate } from 'react-router-dom';


export const WrappedSearchField = ({
  minAmount,
  maxAmount,
}: {
  minAmount?: number,
  maxAmount?: number,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
  } = useFormContext<TypeOfForm>();

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  return (
    <>
      <FilterDialog
        open={filterOpen}
        minAmount={minAmount ?? 0}
        maxAmount={maxAmount ?? 0}
        handleClose={handleFilterClose}
      />

      <Stack
        direction={'row'}
        spacing={1}
        maxWidth={600}
      >
        <OutlinedInput fullWidth {...register('mainSearch')} />
        <SubmitButton>
          <SearchIcon />
        </SubmitButton>
        <Button
          variant={'contained'}
          onClick={handleFilterOpen}
        >
          <FilterListIcon />
        </Button>
        <Button
          sx={{ wordBreak: 'keep-all' }}
          onClick={()=>{
            navigate(''); // Clear parameters
          }}
        >
          リセット
        </Button>
      </Stack>

    </>
  );
};