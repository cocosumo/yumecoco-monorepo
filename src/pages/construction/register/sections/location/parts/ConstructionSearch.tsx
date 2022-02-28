import { Grid, FormControl, FormHelperText, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ConstructionSearch = () => {
  return (
    <Grid item xs={12} justifyContent={'flex-start'}>
      <FormControl>
        <Button variant={'contained'} color="secondary" size={'large'} startIcon={<SearchIcon/>}>検索</Button>
        <FormHelperText id="my-helper-text">過去の工事情報から参照する</FormHelperText>
      </FormControl>
    </Grid>
  );
};

export default ConstructionSearch;