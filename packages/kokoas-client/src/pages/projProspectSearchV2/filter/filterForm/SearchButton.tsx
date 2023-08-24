import { Button } from '@mui/material';
//import { useStartSearch } from '../../../hooks/useStartSearch';

export const SearchButton = ({
  handleClose,
}:{
  handleClose: () => void
}) => {
  //const handleStartSearch = useStartSearch();

  return (
    <Button
      onClick={() => {
        //handleStartSearch();
        handleClose();
      }} 
      variant='contained'
    >
      検索
    </Button>
  );
};