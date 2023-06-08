import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { useProjTypes } from 'kokoas-client/src/hooksQuery';

export const ProjType = () => {
  const { data } = useProjTypes({
    select: (d) => {
      return d.map(({ label, uuid }) => ({
        label: label.value,
        key: uuid.value,
      }));
    },
  });


  return (
    <FormGroup>
      <FormLabel>
        工事種別
      </FormLabel>
      <Grid container>
        {data?.map(({ key, label }) => {
          return (
            <Grid 
              key={key} 
              xs={6}
              md={3}
            >
              <FormControlLabel 
                control={(
                  <Checkbox 
                    //checked={stores?.includes(label) ?? false}
                    value={label}
                  />
                )} 
                label={label.replace('工事', '')}
              />
            </Grid>
          );
        })}
      </Grid>
    </FormGroup>
  );
};