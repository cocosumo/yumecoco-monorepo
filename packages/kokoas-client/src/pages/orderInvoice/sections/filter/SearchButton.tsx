import { Button, Tooltip } from '@mui/material';
import { useStartSearch } from '../../hooks/useStartSearch';
import SearchIcon from '@mui/icons-material/Search';

export const SearchButton = () => {
  const handleStartSearch = useStartSearch();
  return (
    <Tooltip title={'検索'}>
      <Button 
        variant={'outlined'}
        color={'primary'}
        onClick={handleStartSearch}
      >
        <SearchIcon />
      </Button>
    </Tooltip>
  );
};