import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useStores } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { IStores } from 'types';


export const Stores = () => {
  const { data } = useStores(
    useCallback(
      (d: IStores[]) => {
        
        return d
          .filter(({ storeNameShort }) => !!storeNameShort.value)
          .map(({ storeNameShort, uuid }) => ({
            label: storeNameShort.value,
            key: uuid.value,
          }));
      }, 
      [],
    ),
  );
  return (
    <FormGroup >
      <FormLabel>
        店舗
      </FormLabel>
      <Grid container>
     
        {data?.map(({ key, label }) => {
          return (
            <Grid 
              key={key} 
              xs={'auto'}
            >
              <FormControlLabel 
                control={(
                  <Checkbox 
                    //checked={stores?.includes(label) ?? false}
                    value={label} 
                    //onChange={handleChange}
                  />
                )} 
                label={label}
              />
            </Grid>
          );
        })}
      
      </Grid>
    </FormGroup>
  );
};