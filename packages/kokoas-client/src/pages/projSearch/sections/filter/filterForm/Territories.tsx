import { Checkbox, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFormContext, Controller } from 'react-hook-form';
import { Territory, territories } from 'types';
import { TypeOfForm } from '../../../schema';
import { useStores } from 'kokoas-client/src/hooksQuery';


export const Territories = () => {

  const { 
    control,
    setValue,
    getValues,
  } = useFormContext<TypeOfForm>();

  const { data } = useStores((s) => {
    return s.reduce(
      (acc, cur) => {
        const {
          territory,
          storeNameShort,
        } = cur;
        if (!storeNameShort.value) return acc;

        const resolvedTerritory = territory.value as Territory;

        if (!acc[resolvedTerritory]) {
          acc[resolvedTerritory] = [];
        }
        acc[resolvedTerritory].push(storeNameShort.value);
        return acc;
      }, 
      {} as Record<Territory, string[]>,
    );
  });


  if (!data) return null;


  return (
    <FormGroup >
      <FormLabel>
        領域
      </FormLabel>
      <Controller 
        name='territories'
        control={control}
        render={({ 
          field : {
            value: territoriesVal,
            onChange,
          }, 
          
        }) => (
        
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
                        checked={territoriesVal?.includes(territory) ?? false}
                        value={territory}
                      />
                    )} 
                    label={territory}
                    onChange={(_, checked) => {
                      const newTerritoriesVal = checked
                        ? [...(territoriesVal ?? []), territory]
                        : (territoriesVal ?? []).filter((t) => t !== territory);
                      onChange(newTerritoriesVal);

                      // side effect that sets stores
                      const storesVal = getValues('stores');
                      const updatedStoresVal = checked
                        ? [...new Set([...(storesVal ?? []), ...data[territory]])]
                        : (storesVal ?? []).filter((store) => !data[territory].includes(store));
                      setValue('stores', updatedStoresVal);
                      
                    }}
                  />
                </Grid>
              );
            })}
      
          </Grid>
        )}
      />
      
    </FormGroup>
  );
};