import { Button, Tooltip } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { FilterDialog } from './filterForm/FilterDialog';
import { useState } from 'react';
export const FilterButton = () => {
  const [ open, setOpen ] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);


  return (
    <>
      <Tooltip title={'絞り込み'}>
        <Button 
          variant={'outlined'}
          onClick={handleOpen}
        >
          <FilterListIcon />
        </Button>
      </Tooltip>
      <FilterDialog open={open} handleClose={handleClose} />
    </>
   
  );
};