import { Grid } from '@mui/material';
import { useStores } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { IStores } from 'types';
import { TypeOfForm } from '../../form';

export const Stores = () => {
  
  const { control } = useFormContext<TypeOfForm>();

  const { data } = useStores(
    useCallback(
      (d: IStores[]) => {
        
        return d
          .filter(({ storeNameShort }) => !!storeNameShort.value)
          .map<string>(({ storeNameShort }) => storeNameShort.value);
      }, 
      [],
    ),
  );

  
  return (
    <Grid container>
      <Grid item xs={6}>
        {data?.map((storeNameShort) => {
          return (
            <div key={storeNameShort}>
              <input
                type='checkbox'
                name='stores'
                value={storeNameShort}
              />
              {storeNameShort}
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
};