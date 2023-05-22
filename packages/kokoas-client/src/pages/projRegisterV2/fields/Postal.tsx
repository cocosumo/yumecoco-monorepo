import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Unstable_Grid2/';

export const Postal = () => {
  return (
    <>
      <Grid 
        xs={12}
        md={6} 
        lg={4}
        spacing={2}
      >
        <TextField label="郵便番号" placeholder='4418124' fullWidth />
      </Grid>
      <Grid 
        xs={'auto'}
      >
        <Button
          startIcon={<SearchIcon />} 
          variant='outlined'
        >
          郵便番号から住所を検索
        </Button>
      </Grid>
      <Grid 
        xs={'auto'}
      >
        <Button>
          住所から郵便番号を検索
        </Button>
      </Grid>
    
    </>

  );
};