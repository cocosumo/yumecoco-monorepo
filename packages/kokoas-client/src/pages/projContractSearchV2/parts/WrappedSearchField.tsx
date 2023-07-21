import { Button, Stack } from '@mui/material';
import { FilterDialog } from './filterDialog/FilterDialog';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

import { useState } from 'react';

import { SubmitButton } from './filterDialog/SubmitButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonWithToolTip } from 'kokoas-client/src/components/ui/buttons/ButtonWithSimpleToolTip';
import { SearchField } from './SearchField';
import { CustName } from './filterDialog/CustName';


export const WrappedSearchField = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const navigate = useNavigate();
  const {
    search,
  } = useLocation();

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
        handleClose={handleFilterClose}
        handleSubmit={handleSubmit}
      />

      <Stack
        direction={'row'}
        spacing={1}
        maxWidth={600}
      >
        <SearchField />

        <CustName />

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