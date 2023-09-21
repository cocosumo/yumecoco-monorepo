import { Button, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useStartSearch } from '../hooks/useStartSearch';

export const SearchButton = () => {

  const handleStartSearch = useStartSearch();
 

  return (
    <Tooltip title={'検索'}>
      <Button
        onClick={handleStartSearch} 
        variant={'outlined'}
      >
        <SearchIcon />
      </Button>
    </Tooltip>
  );
};