import { Button, Tooltip } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
export const FilterButton = () => {
  return (
    <Tooltip title={'絞り込み'}>
      <Button variant={'outlined'}>
        <FilterListIcon />
      </Button>
    </Tooltip>
  );
};