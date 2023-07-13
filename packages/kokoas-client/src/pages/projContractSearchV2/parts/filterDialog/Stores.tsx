import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material';
import { useStores } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { IStores } from 'types';
import { useTypedFormContext } from '../../hooks/useTypedHooks';

export const Stores = () => {
  
  const { setValue, control } = useTypedFormContext();

  const stores = useWatch({
    name: 'stores',
    control,
  });

  const { data } = useStores(
    useCallback(
      (d: IStores[]) => {
        
        return d
          .filter(({ storeNameShort }) => !!storeNameShort.value)
          .map(({ 店舗名, uuid }) => ({
            label: 店舗名.value,
            key: uuid.value,
          }));
      }, 
      [],
    ),
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
   

    const newValue = checked ? [...(stores || []), value] : (stores ?? []).filter((v) => v !== value);
    
    setValue('stores', newValue);
  }, [setValue, stores]);
  
  return (
    <FormGroup >
      <Grid container>
     
        {data?.map(({ key, label }) => {
          return (
            <Grid 
              key={key} 
              item 
              xs={6}
              md={4}
            >
              <FormControlLabel 
                control={(
                  <Checkbox 
                    checked={stores?.includes(label) ?? false}
                    value={label} 
                    onChange={handleChange}
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