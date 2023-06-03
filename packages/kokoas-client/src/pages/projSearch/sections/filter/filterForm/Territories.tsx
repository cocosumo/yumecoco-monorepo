import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { territories } from 'types';


export const Territories = () => {
  return (
    <FormGroup >
      <FormLabel>
        領域
      </FormLabel>
      <Grid container>
     
        {territories?.map((territory) => {
          return (
            <Grid 
              key={territory} 
              xs={'auto'}
            >
              <FormControlLabel 
                control={(
                  <Checkbox 
                    //checked={stores?.includes(label) ?? false}
                    value={territory}
                  />
                )} 
                label={territory}
              />
            </Grid>
          );
        })}
      
      </Grid>
    </FormGroup>
  );
};