import { Button, OutlinedInput, Stack } from '@mui/material';
import { FilterDialog } from './filterDialog/FilterDialog';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useState } from 'react';
import {  useFormContext } from 'react-hook-form';
import {  TypeOfForm } from '../form';

import { SubmitButton } from './filterDialog/SubmitButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonWithToolTip } from 'kokoas-client/src/components/ui/buttons/ButtonWithSimpleToolTip';


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
    search,
  } = useLocation();

  const {
    register,
  } = useFormContext<TypeOfForm>();

  const handleFilterOpen = () => setFilterOpen(true);
  const handleFilterClose = () => {
    setFilterOpen(false);
    // navigate to the same page with the same parameters
    navigate(`${search}`);
  };

  const handleSubmit = () => setFilterOpen(false);

  return (
    <>
      <FilterDialog
        open={filterOpen}
        minAmount={minAmount ?? 0}
        maxAmount={maxAmount ?? 0}
        handleClose={handleFilterClose}
        handleSubmit={handleSubmit}
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

        <ButtonWithToolTip
          title={'絞り込み'}
          variant={'contained'}
          onClick={handleFilterOpen}
        >
          <FilterListIcon />
        </ButtonWithToolTip>

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