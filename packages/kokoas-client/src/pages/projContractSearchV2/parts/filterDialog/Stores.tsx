import { Checkbox, Divider, FormControlLabel, FormGroup, FormLabel, Grid } from '@mui/material';
import { useStores } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { useWatch } from 'react-hook-form';
import { IStores, Territory } from 'types';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { grey } from '@mui/material/colors';

export const Stores = () => {
  
  const { setValue, control } = useTypedFormContext();

  const stores = useWatch({
    name: 'stores',
    control,
  });

  const { data } = useStores(
    useCallback(
      (d: IStores[]) => {
        const grouped = d.reduce((acc, cur) => {
          const { territory, uuid, storeNameShort,  店舗名: storeName } = cur;
          if (!storeNameShort.value) return acc;
          const key = territory.value as Territory;
          const label = storeName.value;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push({
            key: uuid.value,
            label,
          });
          return acc;
        }, {} as Record<Territory, { key: string; label: string; }[]>);
        
        

        return grouped;
          
      }, 
      [],
    ),
  );

  const {
    東: east,
    西: west,
  } = data || {};
  

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
   

    const newValue = checked ? [...(stores || []), value] : (stores ?? []).filter((v) => v !== value);
    
    setValue('stores', newValue);
  }, [setValue, stores]);
  
  return (
    <FormGroup >
      <FormLabel>
        店舗
      </FormLabel>
      <Grid 
        container
        bgcolor={grey[50]}
        borderRadius={1}
        p={1}
      >
     
        {west?.map(({ key, label }) => {
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

        <Grid item xs={12}>
          <Divider />
        </Grid>


        {east?.map(({ key, label }) => {
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