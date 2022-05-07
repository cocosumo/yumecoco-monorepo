import { Grid, FormControl, FormHelperText, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { SearchDialog } from './search';

export const ConstructionSearch = (props: {
  disabled : boolean
}) => {
  const { disabled = false } = props;
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Grid item xs={12} justifyContent={'flex-start'}>
      <FormControl>
        <Button
          variant={'contained'}
          color="secondary"
          size={'large'}
          startIcon={<SearchIcon/>}
          onClick={()=>setSearchOpen(true)}
          disabled={disabled}
        >
          検索
        </Button>
        {
          !disabled &&
          <FormHelperText id="my-helper-text">過去の工事情報から参照する</FormHelperText>
        }

      </FormControl>
      <SearchDialog
        open={searchOpen}
        handleClose={()=>setSearchOpen(false)}
      />
    </Grid>
  );
};