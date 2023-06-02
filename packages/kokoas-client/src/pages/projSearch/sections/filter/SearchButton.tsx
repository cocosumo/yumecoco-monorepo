import { Button, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchButton = () => {
  return (
    <Tooltip title={'検索'}>
      <Button variant={'outlined'}>
        <SearchIcon />
      </Button>
    </Tooltip>
  );
};